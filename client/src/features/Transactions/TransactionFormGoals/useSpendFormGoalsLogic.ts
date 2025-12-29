import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import type {Goal, SpendGoal} from "../../../types";
import {useState} from "react";
import moment from "moment";
import * as React from "react";
import {createTransaction} from "../../../store/transactions/transactionsSlice.ts";
import {clearCurrentGoal, updateGoal} from "../../../store/goals/goalsSlice.ts";

type UseSpendFormGoalsLogicFormProps = {
    onCloseModal: () => void;
}
export const useSpendFormGoalsLogic = ({onCloseModal}: UseSpendFormGoalsLogicFormProps) => {
    const dispatch = useAppDispatch();
    const currentGoal = useAppSelector(state => state.goals.currentGoal) as Goal;

    const [formState, setFormState] = useState<SpendGoal>({
        categoryId: '',
        categoryTypeId: '',
        amount: currentGoal?.targetAmount || '0.00',
        when: moment().format('YYYY-MM-DD'),
        description: '',
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const transactionData = {
            ...formState,
            amount: currentGoal.targetAmount,
            categoryTypeId: currentGoal.categoryTypeId,
            categoryId: currentGoal.id,
            cumulative: true
        };

        const completedGoalData = {
            ...currentGoal,
            id: currentGoal.id,
            categoryTypeId: currentGoal.categoryTypeId,
            completed: true
        };

        try {
            await dispatch(createTransaction(transactionData)).unwrap();
            dispatch(updateGoal(completedGoalData));
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

    return {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    }
};