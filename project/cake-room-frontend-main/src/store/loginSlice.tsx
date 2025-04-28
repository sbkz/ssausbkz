import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import { IUser } from "../modelTypes/reponses";
import axios, { AxiosError } from "axios";

type initialStateTypes = {
    isModalActive: boolean,
    isRegisterFormOpen:boolean,
    user: IUser,
    isAuth: boolean,
    isLoading: boolean,
    messageError: string,
    authError: boolean,
    role: string,
    enterLoading: boolean
};

type loginTypes = {
    email: string,
    password: string,
}

type payloadRejectTypes = {
    message: string,
    errors: any
}

export const login = createAsyncThunk<any,any,{
    rejectValue: payloadRejectTypes
  }>(
    'auth/login',
    async ({email, password}: loginTypes, {rejectWithValue}) => {
        try { 
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userId', response.data.user.id);
            return {user: response.data.user}
        } catch (err: any) {
            let error: AxiosError<payloadRejectTypes> = err;
            return rejectWithValue(error.response?.data as payloadRejectTypes)
        }
    }
)

export const registration = createAsyncThunk<any,any,{
    rejectValue: payloadRejectTypes
  }>(
    'auth/registration',
    async ({email, password}: loginTypes, {rejectWithValue}) => {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return {user: response.data.user}
        } catch (err: any) {
            let error: AxiosError<payloadRejectTypes> = err;
            return rejectWithValue(error.response?.data as payloadRejectTypes)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_,{rejectWithValue}) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('basketItems');
            localStorage.removeItem('totalAmount');
            localStorage.removeItem('totalQuantity');
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_,{rejectWithValue}) => {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return {user: response.data.user}
        } catch (err: any) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('basketItems');
            localStorage.removeItem('totalAmount');
            localStorage.removeItem('totalQuantity');
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

const initialState: initialStateTypes = {
    isModalActive: false,
    isRegisterFormOpen: false,
    user: {} as IUser,
    isAuth: !!localStorage.getItem('token'),
    isLoading: false,
    messageError: '',
    authError: true,
    enterLoading: false,
    role: localStorage.getItem('role') || ''
}

const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        openLoginModal(state) {
            state.isModalActive = true
        },
        closeLoginModal(state) {
            state.isModalActive = false
        },
        onFormChange(state) {
            state.messageError = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.enterLoading = true
        })
        .addCase(login.fulfilled, (state , action) => {
            if (action.payload) {
                state.user = action.payload.user
                state.isAuth = true
                state.authError = false
                state.messageError = ''
                state.enterLoading = false
                state.role = action.payload.user.role
                localStorage.setItem('role', action.payload.user.role)
            }
        })
        .addCase(login.rejected, (state, action) => {
            if(action.payload){
                state.messageError = action.payload.message;
                state.authError = true
                state.enterLoading = false
            }
        })
        .addCase(registration.pending, (state) => {
            state.enterLoading = true
        })
        .addCase(registration.fulfilled, (state , action) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.messageError = '';
                state.isAuth = true
                state.authError = false
                state.enterLoading = false
                state.role = action.payload.user.role
            }
        })
        .addCase(registration.rejected,(state, action) => {
            if(action.payload){
                state.messageError = action.payload.message;
                state.authError = true;
                state.enterLoading = false
            }
        })
        .addCase(logout.fulfilled, (state) => {
            state.isAuth = false
            state.authError = true
            state.user = {} as IUser;
            state.role = ''
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.isAuth = true
                state.isLoading = false
                state.role = action.payload.user.role
                localStorage.setItem('role', action.payload.user.role)
            }
        })
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        })
        .addCase(checkAuth.rejected, (state) => {
            state.isLoading = false
            state.isAuth = false
            state.role = ''
            localStorage.removeItem('role')
        })
    }
})

export default LoginSlice.reducer;
export const { openLoginModal, closeLoginModal, onFormChange } = LoginSlice.actions;