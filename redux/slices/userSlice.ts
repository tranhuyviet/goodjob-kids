import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';

const initialState: IUser = {
    name: '',
    jobsDone: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
});

export const { signup } = userSlice.actions;
export default userSlice.reducer;
