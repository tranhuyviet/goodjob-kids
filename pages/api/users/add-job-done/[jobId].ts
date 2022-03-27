import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import userService from '../../../../services/userService';
import db from '../../../../utils/db';
import { generateAuthenticatedUserId } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';
import { IJobDone } from '../../../../utils/types';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { jobId } = req.query;
        const { time } = req.body;

        // connect db
        await db.connect();

        // find the user
        const user = await userService.findUserByUserId(
            generateAuthenticatedUserId(req) as string
        );

        if (!user) {
            return resError(
                res,
                'Not Found',
                {
                    global: 'User not found',
                },
                404
            );
        }

        const jobDone: IJobDone = {
            jobId: Object(jobId),
            time,
        };

        // add jobdone to array jobsdone and save
        user.jobsDone.push(jobDone);
        const updatedUser = await userService.save(user);
        console.log(updatedUser.jobsDone[updatedUser.jobsDone.length - 1]._id);

        // disconnect db
        await db.disconnect();

        // return job done id have just added to jobsdone array
        return resSuccess(res, {
            jobDoneIdAdded:
                updatedUser.jobsDone[updatedUser.jobsDone.length - 1]._id,
        });
    } catch (error) {
        console.log('error', error);
    }
});

export default handler;
