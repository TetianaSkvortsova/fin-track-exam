import {QUERIES} from "../datasources/queries";
import * as db from '../db';
import {Response, Request} from "express";


export const getTransactionsByUserId = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const {whenFrom, whenTo, categoryTypeId, categoryId} = request.query;
        const values = [userId];
        let query: string = QUERIES.SELECT_TRANSACTIONS_BY_USER_ID;
        if (!!whenFrom) {
            values.push(whenFrom);
            query = `${query}${QUERIES.FILTER_TRANSACTIONS_BY_WHEN_FROM.replace('{PARAM}', `$${values.length}`)}`;
        }
        if (!!whenTo) {
            values.push(whenTo);
            query = `${query}${QUERIES.FILTER_TRANSACTIONS_BY_WHEN_TO.replace('{PARAM}', `$${values.length}`)}`;
        }
        if (categoryTypeId) {
            values.push(categoryTypeId);
            query = `${query}${QUERIES.FILTER_TRANSACTIONS_BY_CATEGORY_TYPE_ID.replace('{PARAM}', `$${values.length}`)}`;
        }
        if (categoryId) {
            values.push(categoryId);
            query = `${query}${QUERIES.FILTER_TRANSACTIONS_BY_CATEGORY_ID.replace('{PARAM}', `$${values.length}`)}`;
        }
        const result = await db.query(query, values);

        const cumulative = result
            .rows
            .reduce((acc, curr) => {
                if (curr.cumulative) {
                    acc[curr.category_id] = true
                }
                return acc;
            }, {});

        const rows = result.rows.map((item) => {
            item.fullfilled = !!cumulative[item.category_id];
            return item;
        });

        return response.status(200).json(rows);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const selectBalanceByUserId = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const values = [userId];
        const result = await db.query(QUERIES.SELECT_BALANCE_BY_USER_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {amount: 0});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const appendTransaction = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const {categoryId, when, amount, description, cumulative} = request.body;
        const values = [userId, categoryId, when, amount, description, !!cumulative];
        const result = await db.query(QUERIES.APPEND_TRANSACTION, values);
        return response.status(201).json(result.rows[0]);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const updateTransactionById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const {when, amount, description} = request.body;
        const values = [id, userId, when, amount, description];
        const result = await db.query(QUERIES.UPDATE_TRANSACTION, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const deleteTransactionById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.DELETE_TRANSACTION, values);
        const rows = [
            ...result.rows
        ]
        if (rows.length > 0) {
            const {category_id} = result.rows[0];
            const cumulative = await db.query(QUERIES.DELETE_CUMULATIVE_TRANSACTION_BY_CATEGORY_ID, [userId, category_id]);
            rows.push(...cumulative.rows);

            await db.query(QUERIES.UPDATE_CATEGORY_COMPLETED_TO_FALSE, [category_id, userId]);
        }
        return response.status(200).json(rows);
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const getTransactionById = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.SELECT_TRANSACTION_BY_ID, values);
        return response.status(200).json(result.rows.length > 0 ? result.rows[0] : {});
    }
    catch (error) {
        return response.status(500).json({message: error.message});
    }
}

export const getTransactionsByCategoryType = async (request: Request, response: Response) => {
    try {
        const {userId} = (request as any).user;
        const id = request.params.id;
        const values = [id, userId];
        const result = await db.query(QUERIES.SELECT_TRANSACTIONS_BY_CATEGORY_TYPE, values);
        return response.status(200).json(result.rows);
    }
    catch (error) {
        console.error("FULL ERROR:", error);
        return response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
}