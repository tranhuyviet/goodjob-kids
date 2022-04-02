import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../models/jobModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { errorParse } from '../../../utils/errorParse';
import { resError, resSuccess } from '../../../utils/returnRes';

const handler = nc();
// get user by id
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;
        console.log(userId);
        // connect db
        await db.connect();

        // find the authenticated user
        const user = await userService.findUserByUserId(userId as string);

        if (!user) {
            return resError(
                res,
                'Not Found',
                {
                    global: 'Not found user',
                },
                400
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

        // return user
        return resSuccess(res, { user });
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
