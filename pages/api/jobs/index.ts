import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../models/jobModel';
import jobService from '../../../services/jobService';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { errorParse } from '../../../utils/errorParse';
import { generateAuthenticatedUserId } from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IJobDocument } from '../../../utils/types';
import { jobValidate } from '../../../utils/validate';

const handler = nc();

// add new job
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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

        const { name, image, star } = req.body;

        // validate job
        await jobValidate.validate(
            { name, image, star },
            { abortEarly: false }
        );

        // checking dublicate job
        const isExistJob = await jobService.findJobByName(
            name.trim().toLowerCase()
        );

        if (isExistJob) {
            return resError(
                res,
                'Bad Request Error',
                {
                    job: 'This job is already taken. Please enter another job.',
                },
                400
            );
        }

        // create new job
        const newJob: IJobDocument = new Job({
            name: name.trim().toLowerCase(),
            image: image.trim(),
            star,
        });

        // save job to database
        const job = await jobService.save(newJob);

        // disconnect db
        await db.disconnect();

        // return job
        return resSuccess(res, job);
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

// get all jobs
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // connect db
        await db.connect();

        const jobs = await jobService.getJobs();

        // disconnect db
        await db.disconnect();

        // return jobs
        return resSuccess(res, { jobs });
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
