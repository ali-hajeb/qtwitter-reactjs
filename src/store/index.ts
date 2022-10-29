import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ProfileColor from '../features/ProfileColor';
import userReducer from '../features/UserAuthentication/store/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profileColor: ProfileColor,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
