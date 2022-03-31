import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../../models/jobModel';
import jobService from '../../../../services/jobService';
import userService from '../../../../services/userService';
import db from '../../../../utils/db';
import { errorParse } from '../../../../utils/errorParse';
import {
    calculateStars,
    generateAuthenticatedUserId,
} from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';
import { IJobDoneBody, IJobDonePopulated } from '../../../../utils/types';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // connect db
        await db.connect();

        // find the authenticated user
        const user = await userService.findUserByUserId(
            generateAuthenticatedUserId(req) as string
        );

        if (!user) {
            return resError(
                res,
                'Unauthorized',
                {
                    global: 'You have no permission.',
                },
                401
            );
        }

        const { jobId } = req.query;
        const { time } = req.body;

        // find the job by jobId
        const job = await jobService.findJobById(jobId as string);

        if (!job) {
            return resError(
                res,
                'NotFound',
                {
                    global: 'Job not found',
                },
                400
            );
        }

        // update total star
        user.totalStars += job.star;

        const jobDone: IJobDoneBody = {
            jobId: Object(jobId),
            time,
        };

        // add jobdone to array jobsdone and save
        user.jobsDone.push(jobDone);

        const updatedUser = await userService.save(user);

        // disconnect db
        await db.disconnect();

        // return job done id have just added to jobsdone array
        return resSuccess(res, {
            jobDoneId:
                updatedUser.jobsDone[updatedUser.jobsDone.length - 1]._id,
        });
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            const errors = errorParse(error);
            resError(res, 'Bad Request Error - Validate Input', errors, 400);
        } else {
            resError(
                res,
                'Something went wrong',
                { global: 'Something went wrong' },
                500
            );
        }
    }
});

export default handler;
