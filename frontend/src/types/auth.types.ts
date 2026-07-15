export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  createdAt?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: File | string;
}

export interface LoginResponse {
  success: boolean;
  user: AuthUser;
  message?: string;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  error?: string | null;
}

export interface UserProfileState {
  loading: boolean;
  isUpdated?: boolean;
  isDeleted?: boolean;
  message?: string;
  error?: string | null;
}

export interface ForgotPasswordState {
  loading: boolean;
  message?: string;
  success?: boolean;
  error?: string | null;
}

export interface AllUsersState {
  loading: boolean;
  users: AuthUser[];
  error?: string | null;
}

export interface UserDetailsState {
  loading: boolean;
  user?: AuthUser | null;
  error?: string | null;
}