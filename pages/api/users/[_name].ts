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
// update jobs done to user
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('body update', req.body);
        // TODO: validate body???

        const { name, image, star, time } = req.body;
        const username = req.cookies.goodjobKids;
        // connect db
        await db.connect();

        // find user by name
        const user = await userService.findUserByName(username);

        if (!user) {
            throw new Error('Can not found user');
        }

        const jobDone = { name, image, star, time };

        user.jobsDone?.push(jobDone);

        await userService.save(user);

        // disconnect db
        await db.disconnect();

        return 'updated';
    } catch (error) {
        console.log('UPDATE USER PUT ERROR', error);
    }
});

export default handler;
