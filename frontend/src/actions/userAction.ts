import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_DETAILS_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";

import axios, { type AxiosError } from "axios";
import type { AppDispatch } from "../store";
import type { RegisterPayload } from "../types/auth.types";

type ErrorResponse = {
  message?: string;
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

// Login Action
export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/login",
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Register Action
export const register =
  (userData: RegisterPayload) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/register",
        userData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Load user
export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("http://localhost:8000/api/v1/me", {
      withCredentials: true,
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

// Logout User
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.get("http://localhost:8000/api/v1/logout", {
      withCredentials: true,
    });

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

// Update Profile
export const updateProfile =
  (userData: FormData) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/v1/me/update",
        userData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Update Password
export const updatePassword =
  (password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/v1/password/update",
        password,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Forgot Password
export const forgotPasswordAction =
  (email: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/password/reset",
        { email },
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Reset Password
export const resetPasswordAction =
  (token: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:8000/api/v1/password/reset/${token}`,
        password,
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Admin actions
export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      "http://localhost:8000/api/v1/admin/users",
      config
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

// Get User Details
export const getUserDetails =
  (id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.get(
        `http://localhost:8000/api/v1/admin/user/${id}`,
        config
      );

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Update User
export const updateUser =
  (id: string, userData: Record<string, unknown>) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `http://localhost:8000/api/v1/admin/user/${id}`,
        userData,
        config
      );

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Delete user
export const deleteUser =
  (id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/admin/user/${id}`,
        config
      );

      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

// Handle errors
export const clearErrors = () => async (dispatch: AppDispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};