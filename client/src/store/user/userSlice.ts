import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import type {RegisterData, ResponseData, UserState} from "../../types";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    balance: {
        amount: '0.00',
        expenses: '0.00',
        income: '0.00',
    },
    error: undefined,
};

const API_URL = import.meta.env.VITE_API_KEY_OPEN;
const API_URL_BALANCE = import.meta.env.VITE_API_KEY;
const API_URL_BALANCE_CATEGORY_TYPE = import.meta.env.VITE_API_KEY;
const REGISTER_URL = `${API_URL}/register`;
const BALANCE_URL = `${API_URL_BALANCE}/balance`;
const BALANCE_CATEGORY_TYPE_URL = `${API_URL_BALANCE_CATEGORY_TYPE}/categories`;
export const client = axios.create({ //Todo: check if header is ok for auth
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const registerNewUser = createAsyncThunk<ResponseData, RegisterData, { rejectValue: string }>(
    'user/registerNewUser',
    async (user, {rejectWithValue}) => {
        try {
            const result = await client.post(REGISTER_URL, user);
            const newToken = result.data.token;
            sessionStorage.setItem('token', newToken);
            client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return result.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Email already exists';
                return rejectWithValue(errorMessage);
            }
            return rejectWithValue('Network error');
        }
    })

export const getBalanceByUser = createAsyncThunk(
    'user/getBalance',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await client.get(BALANCE_URL);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const getBalanceByCategoryType = createAsyncThunk(
    'categories/getBalanceByCategoryType',
    async (typeId: string, {rejectWithValue}) => {
        try {
            const response = await client.get(`${BALANCE_CATEGORY_TYPE_URL}?categoryTypeId=${typeId}&balance=true`);

            return {
                data: response.data,
                typeId: typeId,
            };

        } catch (error) {
            console.log(error);
            return rejectWithValue("Error getting balance by category type");
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Stub: login
        loginSuccessMock: (state) => {
            state.isAuthenticated = true;
            state.user = {id: 'u1', email: 'test@example.com'};
        },
        // Stub: logout
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = '';
        },
        //If error in register form "email already exist
        clearRegistrationError: (state) => {
            state.error = '';
        },

        setAuthToken: (state) => {
            const isAuth = sessionStorage.getItem('token');
            if (!isAuth) return;
            state.isAuthenticated = true;
            state.user = {id: 'u1', email: 'test@example.com'};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = '';
            })
            .addCase(registerNewUser.rejected, (state, action) => {
                state.error = action.payload;
            });

        builder
            .addCase(getBalanceByUser.fulfilled, (state, action) => {
                state.balance.amount = action.payload.amount;
                state.error = '';
            })
            .addCase(getBalanceByUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder
            .addCase(getBalanceByCategoryType.fulfilled, (state, action) => {
                const { data, typeId } = action.payload;

                if (typeId === INCOME_CATEGORY_ID) {
                    state.balance.income = data.amount;
                } else if (typeId === EXPENSE_CATEGORY_ID) {
                    state.balance.expenses = data.amount;
                }
                state.error = '';
            })
            .addCase(getBalanceByCategoryType.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }

});



export const {loginSuccessMock, logout, clearRegistrationError, setAuthToken} = userSlice.actions;

export default userSlice.reducer;