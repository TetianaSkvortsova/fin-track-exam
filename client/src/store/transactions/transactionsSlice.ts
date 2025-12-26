import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import moment from 'moment';
import type {
    DateRangeParams, initialRequestState,
    RequestAddTransaction,
    Transaction,
    TransactionsInitialState
} from "../../types";
import axios from "axios";

const initialState: TransactionsInitialState = {
    transactions: [],
    currentTransaction: null,
    error: ''
};

const API_URL = import.meta.env.VITE_API_KEY;
const TRANSACTIONS_URL = `${API_URL}/transactions`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});
/*async ({dateFrom, dateTo}: DateRangeParams, {rejectWithValue}) => {
    try {
        const {data} = await client.get(`${TRANSACTIONS_URL}?whenFrom=${dateFrom}&whenTo=${dateTo}`);*/
export const getTransactionsByUser = createAsyncThunk(
    'transactions/getTransactions',
    async (requestData: initialRequestState, {rejectWithValue}) => {
        const {categoryType, category, startDate, endDate} = requestData;
        try {
            console.log(`${TRANSACTIONS_URL}?${categoryType}&${category}&${startDate}&${endDate}`);
            const {data} = await client.get(`${TRANSACTIONS_URL}?${categoryType}&${category}&${startDate}&${endDate}`);
            return data.map(({ category_id, category_type_id, ...rest }) => ({
                ...rest,
                categoryId: category_id,
                categoryTypeId: category_type_id,
            }));
            /*const {data} = await client.get(TRANSACTIONS_URL);
            const transformedData = data.map(({ category_id, ...rest }) => ({
                ...rest,
                categoryId: category_id,
            }));
            return transformedData;*/
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const getTransactionById = createAsyncThunk(
    'transactions/getTransactionById',
    async (transactionId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${TRANSACTIONS_URL}/${transactionId}`);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const createTransaction = createAsyncThunk<Transaction, RequestAddTransaction, { rejectValue: string }>(
    'transactions/createTransaction',
    async (newTransaction: RequestAddTransaction, {rejectWithValue}) => {
        const {id, ...rest} = newTransaction;
        try {
            const {data} = await client.post(TRANSACTIONS_URL, rest);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const updateTransaction = createAsyncThunk<Transaction, Transaction, { rejectValue: string }>(
    'transactions/updateTransaction',
    async (updatedTransaction: Transaction, {rejectWithValue}) => {
        try {
            const transactionId = updatedTransaction.id;
            const {data} = await client.put(`${TRANSACTIONS_URL}/${transactionId}`, updatedTransaction);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (transactionId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.delete(`${TRANSACTIONS_URL}/${transactionId}`);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)

/*export const getTransactionsByCategoryType = createAsyncThunk(
    'transactions/getTransactionsByCategoryType',
    async (categoryTypeId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${TRANSACTIONS_URL}/type/${categoryTypeId}`);
            const transformedData = data.map(({ category_type_id, category_id, ...rest }) => ({
                ...rest,
                categoryTypeId: category_type_id,
                categoryId: category_id,
            }));
            return transformedData;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)*/

/*export const getTransactionsByDate = createAsyncThunk(
    'transactions/getTransactionsByDate',
    async ({dateFrom, dateTo}: DateRangeParams, {rejectWithValue}) => {
        try {
            const {data} = await client.get(`${TRANSACTIONS_URL}?whenFrom=${dateFrom}&whenTo=${dateTo}`);
            const transformedData = data.map(({ category_type_id, category_id, when, ...rest }) => {
                const correctDate = moment(when).format('YYYY-MM-DD');
                return {
                    ...rest,
                    categoryTypeId: category_type_id,
                    categoryId: category_id,
                    when: correctDate,
                }
            });
            return transformedData;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Network error');
        }
    }
)*/

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearCurrentTransaction: (state) => {
            state.currentTransaction = null;
        },

        /*setTransactionsByCategory: (state, action) => {
            state.transactions = state.transactions.filter((transaction) => transaction.categoryId === action.payload);
        }*/
    },
    extraReducers: builder => {
        builder
            .addCase(getTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload.map((transaction: Transaction) => {
                    const {when, ...rest} = transaction;
                    const correctDate = moment(when).format('YYYY-MM-DD');

                    return {
                        ...rest,
                        when: correctDate
                    };
                })
            })

            .addCase(getTransactionsByUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(createTransaction.fulfilled, (state, action) => {
                const {when, category_type_id: categoryTypeId, ...rest} = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryTypeId
                };
                state.transactions.push(finalTransaction);
            })

            .addCase(createTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const {when, category_type_id: categoryTypeId, ...rest} = action.payload;
                const correctDate = moment(when).format('YYYY-MM-DD');
                const finalTransaction = {
                    ...rest,
                    when: correctDate,
                    categoryTypeId
                };
                const updatedTransactionIndex = state.transactions.findIndex((transaction) =>
                    transaction.id === action.payload.id
                );
                state.transactions.splice(updatedTransactionIndex, 1, finalTransaction);
                state.currentTransaction = null;
            })

            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(getTransactionById.fulfilled, (state, action) => {
                const {
                    category_type_id: categoryTypeId,
                    category_id: categoryId,
                    amount,
                    when,
                    ...rest
                } = action.payload;

                state.currentTransaction = {
                    ...rest,
                    categoryId,
                    categoryTypeId,
                    amount: amount ? Number(amount).toFixed(2) : '0.00',
                    when: when ? moment(when).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
                };
            })

            .addCase(getTransactionById.rejected, (state, action) => {
                state.error = action.payload as string;
            })

        builder
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter((transaction) =>
                    transaction.id !== action.payload.id);
            })

            .addCase(deleteTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
            })

       /* builder
            .addCase(getTransactionsByCategoryType.fulfilled, (state, action) => {
                state.transactions = action.payload;
            })

            .addCase(getTransactionsByCategoryType.rejected, (state, action) => {
                state.error = action.payload as string;
            })*/

       /* builder
            .addCase(getTransactionsByDate.fulfilled, (state, action) => {
                state.transactions = action.payload;
            })

            .addCase(getTransactionsByDate.rejected, (state, action) => {
                state.error = action.payload as string;
            })*/

    },
});

export const {clearCurrentTransaction, setTransactionsByCategory} = transactionsSlice.actions;
export default transactionsSlice.reducer;