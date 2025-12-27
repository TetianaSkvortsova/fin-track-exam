import {useMemo} from "react";
import * as React from "react";
import type {CategoryType, CategoryTypes} from "../types";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../constants/categoryTypes.ts";
import {setCurrentType} from "../store/category/categorySlice.ts";

export type UseCategoriesType = {
    categories: CategoryTypes[];
    currentCategoryType: CategoryTypes;
    handleChange: (event: React.MouseEvent<HTMLElement>, newCategoryType: CategoryType) => void;
}

export const useCategoryTypeToggleButtonsLogic = (): UseCategoriesType => {
    const dispatch = useAppDispatch();
    const {types: categoryTypes, currentType: currentTypeId} = useAppSelector(state => state.categories);

    const categories = useMemo(() => {
        return categoryTypes.filter(item =>
            item.id === EXPENSE_CATEGORY_ID || item.id === INCOME_CATEGORY_ID
        );
    }, [categoryTypes]);

    const currentCategoryType = useMemo(() => {
        return categoryTypes.find(item => item.id === currentTypeId)
            || categoryTypes.find(item => item.id === EXPENSE_CATEGORY_ID)
            || categories[0];
    }, [categoryTypes, currentTypeId, categories]);

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategoryId: CategoryType,
    ) => {
        if (newCategoryId && newCategoryId !== currentTypeId) {
            dispatch(setCurrentType(newCategoryId));
        }
    };
    return {
        categories,
        currentCategoryType,
        handleChange,
    }
}