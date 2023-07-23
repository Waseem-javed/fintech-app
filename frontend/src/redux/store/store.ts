import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { rootReducer } from 'redux/reducers';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

/**
 * App dispatch as a replacement for default useDispatch hook
 *
 * @returns {AppDispatch} returns app dispatch instance for store.dispatch
 */
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
