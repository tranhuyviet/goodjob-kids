import { Document } from 'mongoose';

// JOB
export interface IJob {
    _id?: string;
    name: string;
    image: string;
    star: number;
}

export interface IJobDone extends IJob {
    time: string;
}

export interface IJobsDone {
    jobsDone: IJobDone[];
    totalStars: number;
}

// USER
export interface IUser {
    name: string;
    jobsDone: IJobDone[];
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
};
