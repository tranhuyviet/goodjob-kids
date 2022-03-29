import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../../models/jobModel';
import userService from '../../../../services/userService';
import db from '../../../../utils/db';
import { generateAuthenticatedUserId } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
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

        await user.populate({
            path: 'jobsDone',
            populate: {
                path: 'jobId',
                model: Job,
                select: 'name image star',
            },
        });

        // disconnect db
        await db.disconnect();

        // return job done id have just added to jobsdone array
        return resSuccess(res, {
            jobsDone: user.jobsDone,
        });
    } catch (error) {
        console.log('error', error);
    }
});

export default handler;
