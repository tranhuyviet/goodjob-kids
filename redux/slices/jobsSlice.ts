import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IJob {
    _id?: string;
    name: string;
    image: string;
    star: number;
    createAt?: string;
}

export interface IJobsDone {
    jobs: IJob[];
    totalStars: number;
}

const initialState: IJobsDone = {
    jobs: [],
    totalStars: 0,
};

const calculateStars = (jobs: IJob[]): number => {
    let totalStars = 0;
    for (const job of jobs) {
        totalStars += job.star;
    }
    return totalStars;
};

const jobsSlice = createSlice({
    name: 'stars',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<IJob>) => {
            state.jobs = [...state.jobs, action.payload];
            state.totalStars = calculateStars(state.jobs);
        },
    },
});

export const { addJob } = jobsSlice.actions;
export default jobsSlice.reducer;
