import { IJobDone } from './../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';

const initialState: IUser = {
    _id: '',
    name: '',
    userName: '',
    jobsDone: [],
};

// const calculateStars = (jobsDone: IJobDone[]): number => {
//     let totalStars = 0;
//     for (const jobDone of jobsDone) {
//         totalStars += jobDone.star;
//     }
//     return totalStars;
// };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action: PayloadAction<IUser>) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.userName = action.payload.userName;
        },
        // addJob: (state, action: PayloadAction<IJobDone>) => {
        //     state.jobsDone = [
        //         ...(state.jobsDone as IJobDone[]),
        //         action.payload,
        //     ];
        //     state.totalStars = calculateStars(state.jobsDone);
        // },
        // removeJob: (state, action: PayloadAction<{ jobDoneId: string }>) => {
        //     state.jobsDone =
        //         state.jobsDone &&
        //         state.jobsDone.filter(
        //             (jobDone) => jobDone.jobDoneId !== action.payload.jobDoneId
        //         );
        //     state.totalStars = calculateStars(state.jobsDone as IJobDone[]);
        // },
    },
});

export const { signup } = userSlice.actions;
export default userSlice.reducer;
