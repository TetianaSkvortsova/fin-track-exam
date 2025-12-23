import axios from "axios";
import {createSlice} from "@reduxjs/toolkit";
import type { GoalsState } from "../../types";
// import {categorySlice} from "../category/categorySlice.ts";

const initialState: GoalsState = {
    goals: [],
    currentGoal: null,
    error: '',
};

const API_URL = import.meta.env.VITE_API_KEY;
// const CATEGORY_TYPES_URL = `${API_URL}/category-types`;
// const CATEGORIES_URL = `${API_URL}/categories`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
})

export default goalsSlice.reducer;