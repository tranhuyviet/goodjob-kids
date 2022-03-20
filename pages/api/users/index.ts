import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from '../../../models/userModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { errorParse } from '../../../utils/errorParse';
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

        const nameTrimAndLowercase = name.trim().toLowerCase();
        // check user name is exist
        const isExistUser = await userService.findUserByName(
            nameTrimAndLowercase
        );

        if (isExistUser) {
            return resError(
                res,
                'Conflict Error',
                {
                    name: 'This name is already taken. Please enter another name.',
                },
                409
            );
        }

        // create new user
        const user: IUserDocument = new User({ name });

        // save user
        const newUser = await userService.save(user);

        // disconnect db
        await db.disconnect();

        // return new user
        return resSuccess(res, user);
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
