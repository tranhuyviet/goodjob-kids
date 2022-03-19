import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJobDone, IJobsDone } from '../../utils/types';

const initialState: IJobsDone = {
    jobsDone: [],
    totalStars: 0,
};

const calculateStars = (jobsDone: IJobDone[]): number => {
    let totalStars = 0;
    for (const jobDone of jobsDone) {
        totalStars += jobDone.star;
    }
    return totalStars;
};

const jobsSlice = createSlice({
    name: 'jobsDone',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<IJobDone>) => {
            state.jobsDone = [...state.jobsDone, action.payload];
            state.totalStars = calculateStars(state.jobsDone);
        },
        removeJob: (state, action: PayloadAction<number>) => {
            state.jobsDone.splice(action.payload, 1);
        },
    },
});

export const { addJob, removeJob } = jobsSlice.actions;
export default jobsSlice.reducer;
