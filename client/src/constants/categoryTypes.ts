import type {CategoryTypes} from "../types";
import {
    EXPENSE_CATEGORY_ID,
    GOAL_CATEGORY_ID,
    INCOME_CATEGORY_ID
} from "../../../global/constants/category-type-ids.ts";

type TObjectIds = {
    [key: string]: Partial<CategoryTypes>
}

export const CATEGORY_TYPES: TObjectIds = Object.freeze({
    [INCOME_CATEGORY_ID]: {
        caption: 'Income'
    },
    [EXPENSE_CATEGORY_ID]: {
        caption: 'Expense'
    },
    [GOAL_CATEGORY_ID]: {
        caption: 'Goal'
    }
})