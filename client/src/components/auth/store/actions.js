import axios from 'axios';

import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';
import * as types from './types';

import api from '../../../api/config';

export const getErrors = (errorMessage, errorStatus, idMessage = null) => {
  return {
    type: types.GET_ERRORS,
    payload: { errorMessage, errorStatus, idMessage },
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};

export const userLoading = () => {
  return {
    type: types.USER_LOADING,
  };
};

export const userLoaded = (payload) => {
  return {
    type: types.USER_LOADED,
    payload,
  };
};

export const userRegisteredSuccess = (res) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: res,
  };
};

export const userLoginSuccess = (res) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: res,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const editUser = (data) => async (dispatch, getState) => {
  try {
    dispatch(loaderOn());
    const response = await axios.put(
      `${api}/auth/user/edit-user`,
      data,
      tokenConfig(getState)
    );
    const { message } = response.data;
    const status = response.status;
    console.log(response);
    dispatch(loadUser());
    dispatch(loaderOff());
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(loaderOff());
    dispatch(toasterOn(err.response.data.message, err.response.status));
  }
};
export const editCompany = (data) => async (dispatch, getState) => {
  try {
    dispatch(loaderOn());
    const response = await axios.put(
      `${api}/auth/user/edit-company`,
      data,
      tokenConfig(getState)
    );
    const { message } = response.data;
    const status = response.status;
    dispatch(loadUser());
    dispatch(loaderOff());
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(loaderOff());
    dispatch(toasterOn(err.response.data.message, err.response.status));
  }
};

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch(loaderOn());
    dispatch(userLoading());
    const response = await axios.get(`${api}/auth/user`, tokenConfig(getState));
    dispatch(userLoaded(response.data));
    dispatch(loaderOff());
  } catch (err) {
    dispatch(loaderOff());
    dispatch(getErrors(err.response.data.message, err.response.status));
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};
export const loginUser = (userData, history) => async (dispatch, getState) => {
  try {
    dispatch(loaderOn());
    const response = await axios.post(`${api}/auth/login`, userData);
    dispatch(userLoginSuccess(response.data));
    const hasDetails = getState().auth.user.CompanyName;
    hasDetails ? history.push(`/invoices/`) : history.push(`/user`);
    dispatch(loaderOff());
  } catch (err) {
    dispatch(loaderOff());
    dispatch(
      getErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL')
    );
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.put(`${api}/auth/signup`, userData);
    history.push(`/login/`);
    const { message } = response.data;
    const status = response.status;
    dispatch(userRegisteredSuccess(response.data));
    dispatch(loaderOff());
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(loaderOff());
    dispatch(
      getErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
