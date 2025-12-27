import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import userReducer from "./user/userSlice";
import categoriesReducer from "./category/categorySlice.ts";
import dialogReducer from "./confirmationDialog/confirmationDialogSlice.ts";
import balanceReducer from "./balance/balanceSlice.ts";
import transactionsReducer from "./transactions/transactionsSlice.ts";
import goalsReducer from "./goals/goalsSlice.ts";

const combinedReducer = combineReducers({
    dialog: dialogReducer,
    modal: modalReducer,
    user: userReducer,
    balance: balanceReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
    goals: goalsReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'user/logout') {
        state = undefined;
        // localStorage.removeItem('persist:root');
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;