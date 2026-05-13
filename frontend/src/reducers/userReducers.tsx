import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from "../constants/userConstants";


// ================= USER INTERFACE =================

interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
}

// ================= ACTION INTERFACE =================

interface Action {
    type: string;
    payload?: any;
}

// ================= USER REDUCER =================

interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
}

const initialUserState: UserState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
};

export const userReducer = (
    state: UserState = initialUserState,
    action: Action
): UserState => {

    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: null,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// ================= PROFILE REDUCER =================

interface ProfileState {
    loading?: boolean;
    isUpdated?: boolean;
    isDeleted?: boolean;
    message?: string;
    error?: string | null;
}

const initialProfileState: ProfileState = {
    loading: false,
};

export const profileReducer = (
    state: ProfileState = initialProfileState,
    action: Action
): ProfileState => {

    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            };

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// ================= UPDATE REDUCER =================

interface UpdateState {
    loading?: boolean;
    isUpdated?: boolean;
    error?: string | null;
}

const initialUpdateState: UpdateState = {
    loading: false,
    isUpdated: false,
};

export const updateReducer = (
    state: UpdateState = initialUpdateState,
    action: Action
): UpdateState => {

    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// ================= FORGOT PASSWORD REDUCER =================

interface ForgotPasswordState {
    loading?: boolean;
    message?: string;
    success?: boolean;
    error?: string | null;
}

const initialForgotPasswordState: ForgotPasswordState = {
    loading: false,
};

export const forgotPasswordReducer = (
    state: ForgotPasswordState = initialForgotPasswordState,
    action: Action
): ForgotPasswordState => {

    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// ================= ALL USERS REDUCER =================

interface AllUsersState {
    loading?: boolean;
    users: User[];
    error?: string | null;
}

const initialAllUsersState: AllUsersState = {
    loading: false,
    users: [],
};

export const allUsersReducer = (
    state: AllUsersState = initialAllUsersState,
    action: Action
): AllUsersState => {

    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


// ================= USER DETAILS REDUCER =================

interface UserDetailsState {
    loading?: boolean;
    user: User | null;
    error?: string | null;
}

const initialUserDetailsState: UserDetailsState = {
    loading: false,
    user: null,
};

export const userDetailsReducer = (
    state: UserDetailsState = initialUserDetailsState,
    action: Action
): UserDetailsState => {

    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};