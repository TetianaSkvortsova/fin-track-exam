import {useEffect, useState} from "react";
import type {Goal} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import * as React from "react";
import {clearCurrentGoal, createGoal, updateGoal} from "../../store/goals/goalsSlice.ts";

type GoalsFormProps = {
    onCloseModal: () => void;
}

export const useGoalsFormLogic = ({onCloseModal}: GoalsFormProps) => {
    const dispatch = useAppDispatch();
    const currentGoal = useAppSelector(state => state.goals.currentGoal) as Goal | null;
    const [formState, setFormState] = useState<Goal>({
        id: '',
        categoryTypeId: '',
        name: '',
        targetAmount: '',
        targetDate: '',
        balance: '0',
        completed: false,
    });

    useEffect(() => {
        if (currentGoal) {
            setFormState({
                id: currentGoal.id,
                categoryTypeId: currentGoal.categoryTypeId || '',
                name: currentGoal.name || '',
                targetAmount: currentGoal.targetAmount || '',
                targetDate: currentGoal.targetDate || '',
                balance: currentGoal.balance || '0',
                completed: currentGoal.completed || false,
            });

        }
    }, [currentGoal]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const isEditing = !!currentGoal;
        if (isEditing) {
            dispatch(updateGoal(formState));
        } else {
            dispatch(createGoal(formState));
        }
        onCloseModal();
        dispatch(clearCurrentGoal());
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const normalizedValue = name === 'targetAmount' ? value.replace(',', '.') : value;
        if (name === 'targetAmount') {
            setFormState({
                ...formState,
                [name]: normalizedValue,
            });
            return;
        }
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleCancel = () => {
        onCloseModal();
        dispatch(clearCurrentGoal());
    }


    return {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    }
}