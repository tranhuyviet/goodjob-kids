import { IJobDonePopulated, IUserWithJobsDone } from './../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateStars } from '../../utils/generate';

const initialState: IUserWithJobsDone = {
    _id: '',
    name: '',
    userName: '',
    jobsDone: [],
    totalStars: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action: PayloadAction<string>) => {
            state._id = action.payload;
        },

        setUserLoggedIn: (state, action: PayloadAction<IUserWithJobsDone>) => {
            state.name = action.payload.name;
            state.userName = action.payload.userName;
            state.jobsDone = action.payload.jobsDone;
            state.totalStars = calculateStars(state.jobsDone);
        },

        addJob: (state, action: PayloadAction<IJobDonePopulated>) => {
            state.jobsDone = [...state.jobsDone!, action.payload];
            state.totalStars = calculateStars(state.jobsDone);
        },

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

export const { signup, setUserLoggedIn, addJob } = userSlice.actions;
export default userSlice.reducer;
