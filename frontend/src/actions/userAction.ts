import axios, {AxiosError} from 'axios';
import type { Dispatch } from "redux";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_USER_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS ,UPDATE_USER_REQUEST, DELETE_USER_REQUEST, DELETE_USER_SUCCESS} from '../constants/userConstants';
import { UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST } from '../constants/productConstants';
import { ALL_ORDER_SUCCESS, CLEAR_ERRORS } from '../constants/orderConstants';
export const login = (email: string, password: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({type :LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
            withCredentials: true
        };
        const {data} = await axios.post("http://localhost:8000/api/v1/login",
            {
                email,
                password,
            },
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
};

export const register = (userData: FormData) => async(dispatch: Dispatch)=>{
    try {
        dispatch({type: REGISTER_REQUEST});
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const {data} = await axios.post(`http://localhost:8000/api/v1/register`,
            userData,
            config
        );
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
}
export const loadUser = ()=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        });
        const {data} = await axios.get("http://localhost:8000/api/v1/me",{
            withCredentials: true
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
}

export const logout = ()=>async(dispatch: Dispatch)=>{
    try {
        await axios.get(`http://localhost:8000/api/v1/logout`,{
            withCredentials: true
        });
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const updataProfile = (userData: FormData)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        });
        const config = {
            headers:{
                "Content-Type":"multipart/form-data",
            },
            withCredentials: true,
        };
        const {data} = await axios.put(
            `http://localhost:8000/api/v1/me/update`,
            userData,
            config
        );
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const updatePassword = (password: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST,
        });
        const config = {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true
        };
        const {data} = await axios.put(
            "http://localhost:8000/api/v1/password/update",
            password,
            config
        );
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const forgetPasswordAction = (email: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true
        };
        const {data} = await axios.post(
            "http://localhost:8000/api/v1/password/reset",
            email,
            config
        );
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const resetPasswordAction = (token: string, password: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        const config = {
            headers:{
                "Content-Type":'application/json',
            },
            withCredentials: true
        };
        const {data} = await axios.post(
            `http://localhost:8000/api/v1/password/reset/${token}`,
            password,
            config
        );
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const getAllUsers = ()=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        })
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
            withCredentials: true
        };
        const {data} = await axios.get(
            `http://localhost:8000/api/v1/admin/users`,
            config
        );
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.users,
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: ALL_USERS_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
}
export const getUserDetails =(id: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
            withCredentials: true,
        };
        const {data} = await axios.get(
            `http://localhost:8000/api/v1/admin/user/${id}`,
            config
        );
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: ALL_USERS_FAIL,
            payload: err.response?.data?.message || err.message,
        })
    }
};
export const updateUser = (id: string, userData: FormData)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true
        };
        const {data} = await axios.put(
            `http://localhost:8000/api/v1/admin/user/${id}`,
            userData,
            config
        );
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: ALL_USERS_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
}
export const deleteUser = (id: string)=>async(dispatch: Dispatch)=>{
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        });
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true
        };
        const {data} = await axios.delete(
            `http://localhost:8000/api/v1/admin/user/${id}`,
            config
        );
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        dispatch({
            type: ALL_USERS_FAIL,
            payload: err.response?.data?.message || err.message,
        });
    }
}
export const clearErrors = ()=>async(dispatch: Dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}