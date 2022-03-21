import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
