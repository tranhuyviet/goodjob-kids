import jwt from 'jsonwebtoken';

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

export const generateToken = (
    { _id, name, userName }: { _id: string; name: string; userName: string },
    secret: string
): string => {
    return jwt.sign({ _id, name, userName }, secret);
};
