import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendInstance, config } from "config";
import { authReset, clearSession, loginSuccess, registerSuccess, userLoadedSuccess } from "redux/reducers/authReducer";
import { ILoginFormData, IRegisterFormData, IUser } from "redux/types/auth/auth";
import { userLogout } from "utils/Logout";
import { handlerError } from "utils/handleError";


/**
 * registered new user
 *
 * @returns {boolean} register
 */
export const register = createAsyncThunk(
    'registerSlice/register',
    async (formData: IRegisterFormData, { dispatch }) => {
      const body = JSON.stringify(formData);
      try {
        const res = await BackendInstance.post('auth/register', body, config);
        dispatch(registerSuccess());
        dispatch({ place: 'tc', message: res.data.msg, type: 'success' });
        return true;
      } catch (err) {
        handlerError(err)?.forEach((error: string) => {
          dispatch({ place: 'tc', message: error, type: 'danger' });
        });
        return false;
      }
    }
  );

/**
 * creates user session and logs them in
 *
 * @returns {boolean} true if login form is valid and successful, false otherwise
 */
export const login = createAsyncThunk(
    'loginSlice/login',
    async (formData: ILoginFormData, { dispatch }) => {
      const body = JSON.stringify(formData);
      try {
        const res = await BackendInstance.post('auth/login', body, config);
        const responseData = res.data.data as ILoginFormData;
        dispatch({ place: 'tc', message: res.data.msg, type: 'success' });
          
        dispatch(loginSuccess());
        dispatch(loadUser());
        return responseData;
      } catch (err) {
        handlerError(err).forEach((error: string) => {
          dispatch({ place: 'tc', message: error, type: 'danger' });
        });
  
        // dispatch(clearSession());
        return false;
      }
    }
  );


/**
 * loads current user to state
 *
 * @returns {boolean} true if user is loaded successfully
 */
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { dispatch }) => {
  try {
    const res = await BackendInstance.get('auth/user');
    await dispatch(
      userLoadedSuccess({
        user: { ...res.data.data } as IUser,
        isAuthenticated: true
      })
    );
    return true;
  } catch (err) {
    // dispatch(clearSession());
    return false;
  }
});

/**
 * Logs out user and clears session
 *
 * @returns {boolean} true if the session is cleared, false otherwise
 */
export const logout = createAsyncThunk('logoutSlice/logout', async (_, { dispatch }) => {
    let returnValue = false;
    try {
      /*
            {FOR OFFLINE USE}
            First call api then dispatch
            action beacuse logout requires
            secondary token while dispatching
            logout action remove that.
            */
      await userLogout();
      window.location.href = '/login';
      returnValue = true;
    } catch (err) {
      return returnValue;
    } finally {
      
    //   dispatch({ type: RESET });
      dispatch(authReset());
      dispatch(clearSession());
      // eslint-disable-next-line no-unsafe-finally
      return returnValue;
    }
  });