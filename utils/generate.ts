import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { IJobDonePopulated, IUser } from './types';

const secret = process.env.JWT_SECRET as string;

export const generateRandomNumber = (
    minRange: number,
    maxRange: number
): number => {
    const min = Math.ceil(minRange);
    const max = Math.ceil(maxRange);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUserName = (name: string): string => {
    return `${name}#${generateRandomNumber(1000, 9999)}`;
};

export const generateToken = ({
    _id,
    name,
    userName,
    totalStars,
}: IUser): string => {
    return jwt.sign({ _id, name, userName, totalStars }, secret);
};

export const decodeToken = (token: string): IUser | null => {
    try {
        const user = jwt.verify(token, secret) as IUser;
        return user;
    } catch (error) {
        return null;
    }
};

export const generateAuthenticatedUserId = (
    req: NextApiRequest
): string | null => {
    const token = req.cookies.goodjobKids as string;
    const user = decodeToken(token);
    return user?._id ? user._id : null;
};

export const calculateStars = (jobsDone: IJobDonePopulated[]): number => {
    let totalStars = 0;
    for (const jobDone of jobsDone) {
        totalStars += jobDone.jobId.star;
    }
    return totalStars;
};
