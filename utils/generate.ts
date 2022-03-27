import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { ITokenGenerator } from './types';

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
}: ITokenGenerator): string => {
    return jwt.sign({ _id, name, userName }, secret);
};

export const generateAuthenticatedUserId = (
    req: NextApiRequest
): string | null => {
    const token = req.cookies.goodjobKids as string;
    const user = jwt.verify(token, secret) as ITokenGenerator;
    if (user && user._id) {
        return user._id;
    } else {
        return null;
    }
};
