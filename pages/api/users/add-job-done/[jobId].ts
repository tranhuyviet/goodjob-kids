import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import userService from '../../../../services/userService';
import db from '../../../../utils/db';
import { generateAuthenticatedUserId } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';
import { IJobDoneBody } from '../../../../utils/types';

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
        console.log('error', error);
    }
});

export default handler;
