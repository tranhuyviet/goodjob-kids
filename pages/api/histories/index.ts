import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../models/jobModel';
import History from '../../../models/historyModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { errorParse } from '../../../utils/errorParse';
import {
    calculateStars,
    generateAuthenticatedUserId,
} from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IHistoryDocument } from '../../../utils/types';
import { historyValidate } from '../../../utils/validate';
import historyService from '../../../services/historyService';

const handler = nc();

// add to history: got stars
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { timeGotStars, comment } = req.body;

        // validate comment
        await historyValidate.validate({ comment }, { abortEarly: false });

        // connect db
        await db.connect();

        // find the authenticated user
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

        await user.populate({
            path: 'jobsDone',
            populate: {
                path: 'jobId',
                model: Job,
                select: 'name image star',
            },
        });

        const userId = user._id;
        const jobsDone = user.jobsDone;
        const totalStars = calculateStars(jobsDone as any);

        const newHistory: IHistoryDocument = new History({
            userId,
            jobsDone,
            totalStars,
            timeGotStars,
            comment,
        });

        // save history to database
        const history = await historyService.save(newHistory);

        // empty array jobsDone in user collection
        user.jobsDone = [];

        // save user with empty jobsDone to database
        await userService.save(user);

        // disconnect db
        await db.disconnect();

        return resSuccess(res, history);
    } catch (error) {
        console.log(error);
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

// get history

export default handler;
