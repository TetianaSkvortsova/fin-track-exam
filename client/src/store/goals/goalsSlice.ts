import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Goal, GoalsState, NewGoalsResponse} from "../../types";
import moment from "moment/moment";
import {deleteCategory} from "../category/categorySlice.ts";

const initialState: GoalsState = {
    goals: [],
    currentGoal: null,
    error: '',
};

const API_URL = import.meta.env.VITE_API_KEY;
const GOAL_URL = `${API_URL}/goals`;
const DELETE_GOAL_URL = `${API_URL}/categories`;
export const client = axios.create({
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});

export const createGoal = createAsyncThunk<NewGoalsResponse, Goal, { rejectValue: string }>(
    'goals/createGoal',
    async (newGoal: Goal, {rejectWithValue}) => {
        const {id, balance, ...rest} = newGoal;
        try {
            const {data} = await client.post(GOAL_URL, rest);
            const {goal_target_date, goal_amount, id, name, ...restData} = data;
            return {
                id: id,
                name: name,
                targetDate: goal_target_date,
                targetAmount: goal_amount,
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error creating goal");
        }
    })

export const getGoals = createAsyncThunk(
    'goals/getGoals',
    async () => {
        try {
            const {data} = await client.get(`${GOAL_URL}`);
            return (
                data.map((goal) => {
                    const correctDate = moment(goal.goal_target_date).format("D MMM YYYY");
                    return {
                        id: goal.id,
                        name: goal.name,
                        targetDate: correctDate,
                        targetAmount: goal.goal_amount ? Number(goal.goal_amount).toFixed(2) : '0.00',
                        balance: goal.amount ? Number(goal.amount).toFixed(2) : '0.00',
                    } as Goal;
                })
            )
        } catch (error) {
            console.log(error);
            return "Error getting categories";
        }
    })

export const deleteGoal = createAsyncThunk(
    'goals/deleteGoal',
    async (goalId: string, {rejectWithValue}) => {
        try {
            const {data} = await client.delete(`${DELETE_GOAL_URL}/${goalId}`);
            const {id} = data;
            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Error deleting goal");
        }
    }
)

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push({...action.payload, balance: '0'});
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder
            .addCase(getGoals.fulfilled, (state, action) => {
                state.goals = action.payload as Goal[];
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter((goal) => goal.id !== action.payload);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
})

export default goalsSlice.reducer;

