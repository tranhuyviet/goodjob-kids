import { Document } from 'mongoose';

export interface ErrorsObject {
    [name: string]: string;
}

// JOB
export interface IJob {
    name: string;
    image: string;
    star: number;
}

export interface IJobDone {
    _id?: string;
    jobDone: string;
    time: string;
}

export interface IJobsDone {
    jobsDone: IJobDone[];
    totalStars: number;
}

// USER
export interface IUser {
    name: string;
    jobsDone?: IJobDone[];
    totalStars?: number;
}

// PARAMS AND DOCUMENT
export type IJobParams = Document & {
    name: string;
    image: string;
    start: number;
};

export type IUserDocument = Document & {
    name: string;
    jobsDone: IJobDone[];
    returnToken: () => string;
};

export type IJobDocument = Document & {
    name: string;
    image: string;
    start: number;
};

export type ITokenGenerator = {
    _id: string;
    name: string;
    userName: string;
    iat?: number;
};
