import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import userService from '../../../../services/userService';
import db from '../../../../utils/db';
import { generateAuthenticatedUserId } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { jobDoneId } = req.query;

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
            (jobDone) => jobDone._id!.toString() !== jobDoneId.toString()
        );

        // save user
        await userService.save(user);

        // disconnect db
        await db.disconnect();

        // return null if delete success
        return resSuccess(res, null);
    } catch (error) {
        console.log('error', error);
    }
});

export default handler;
