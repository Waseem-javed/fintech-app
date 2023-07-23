import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth/auth';
import { removeSecondaryToken } from 'utils/Logout';

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: () => {},
    loginSuccess: () => {},
    userLoadedSuccess: (state, { payload }: PayloadAction<AuthState>) => {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
    },
    authReset: () => {
      return initialState;
    },
    clearSession: (state) => {
      removeSecondaryToken();
      state.isAuthenticated = false;
    },
    userLoadedFailure: (state) => {
      return state;
    },
    loginFailure: (state) => {
      return state;
    },
    registerFailure: (state) => {
      return state;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  authReset,
  clearSession,
  loginSuccess,
  registerSuccess,
  userLoadedSuccess,
  userLoadedFailure,
  registerFailure,
  loginFailure
} = authSlice.actions;

export default authSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<AuthState>} state - The state of authentication
 * @param {AuthState} state.auth - The state of auth state
 * @returns {AuthState} returns auth state object
 */
export const AuthSelector = (state: { auth: AuthState }): AuthState => {
  return state.auth;
};
