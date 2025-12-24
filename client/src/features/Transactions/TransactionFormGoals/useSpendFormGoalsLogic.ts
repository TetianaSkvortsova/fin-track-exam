import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import type {Goal, SpendGoal} from "../../../types";
import {useEffect, useState} from "react";
import moment from "moment";
import * as React from "react";
import {EXPENSE_CATEGORY_ID} from "../../../constants/categoryTypes.ts";
import {getCategoriesByType, updateCategory} from "../../../store/category/categorySlice.ts";
import {createTransaction} from "../../../store/transactions/transactionsSlice.ts";
import {clearCurrentGoal} from "../../../store/goals/goalsSlice.ts";

type UseSpendFormGoalsLogicFormProps = {
    onCloseModal: () => void;
}
export const useSpendFormGoalsLogic = ({onCloseModal}: UseSpendFormGoalsLogicFormProps) => {
    const dispatch = useAppDispatch();
    const currentGoal = useAppSelector(state => state.goals.currentGoal) as Goal | null;
    const categories = useAppSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(getCategoriesByType(EXPENSE_CATEGORY_ID));
    }, [dispatch, currentGoal]);

    const [formState, setFormState] = useState<SpendGoal>({
        categoryId: '',
        amount: currentGoal?.targetAmount || '0.00',
        when: moment().format('YYYY-MM-DD'),
        description: '',
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const completedGoal = {...currentGoal, completed: true}
        setFormState({
            ...formState,
            amount: currentGoal.targetAmount,
        });
        try {
            await dispatch(createTransaction(formState)).unwrap();
            dispatch(updateCategory(completedGoal));
        } catch (error) {
            console.error('Error create transaction', error);
        }
        onCloseModal();
    }

    const handleCancel = () => {
        onCloseModal();
        dispatch(clearCurrentGoal());
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            categoryId: event.target.value,
        });
    }

    return {
        handleSubmit,
        handleCancel,
        handleChange,
        handleCategoryChange,
        currentGoal,
        categories,
        formState,
    }
};