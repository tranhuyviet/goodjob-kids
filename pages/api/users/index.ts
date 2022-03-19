import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from '../../../models/userModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IUserDocument } from '../../../utils/types';

const handler = nc();

// add new user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('user name', req.body);
        const { name } = req.body;

        // connect db
        await db.connect();

        // check user name is exist
        const isExistUser = await userService.findUserByName(name);

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
        console.log(error);
    }
});

export default handler;
