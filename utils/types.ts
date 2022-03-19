import { Document } from 'mongoose';

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

export type IJobParams = Document & {
    name: string;
    image: string;
    start: number;
};
