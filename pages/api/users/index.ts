import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../models/jobModel';
import User from '../../../models/userModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { errorParse } from '../../../utils/errorParse';
import {
    generateAuthenticatedUserId,
    generateUserName,
} from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IUserDocument } from '../../../utils/types';
import { signupValidate } from '../../../utils/validate';

const handler = nc();

// add new user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name } = req.body;

        // validate name
        await signupValidate.validate({ name }, { abortEarly: false });

        // connect db
        await db.connect();

        // create userName
        let userName: string = '';
        do {
            userName = generateUserName(name.trim());
        } while (!!(await userService.findUserByUserName(userName)));

        // create new user
        const newUser: IUserDocument = new User({
            name: name.trim(),
            userName,
            totalStars: 0,
        });

        // save user to database
        const user = await userService.save(newUser);

        // disconnect db
        await db.disconnect();
        // return new user
        return resSuccess(res, { token: user.returnToken() });
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
