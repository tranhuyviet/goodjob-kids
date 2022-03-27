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
        const { _jobDoneId } = req.query;

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

        // filter jobsdone
        user.jobsDone = user.jobsDone.filter(
            (jobDone) => jobDone._id.toString() !== _jobDoneId.toString()
        );

        // save user
        await userService.save(user);

        // disconnect db
        await db.disconnect();

        return resSuccess(res, user);
    } catch (error) {
        console.log('error', error);
    }
});

export default handler;
