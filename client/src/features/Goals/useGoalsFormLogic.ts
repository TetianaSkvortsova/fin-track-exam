import {useEffect, useState} from "react";
import type {Goal} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import * as React from "react";
import {createGoal, updateGoal} from "../../store/goals/goalsSlice.ts";

type GoalsFormProps = {
    onCloseModal: () => void;
}

export const useGoalsFormLogic = ({onCloseModal}: GoalsFormProps) => {
    const dispatch = useAppDispatch();
    const currentGoal = useAppSelector(state => state.goals.currentGoal) as Goal | null;
    const [formState, setFormState] = useState<Goal>({
        id: '',
        name: '',
        targetAmount: '',
        targetDate: '',
        balance: '0',
    });

    useEffect(() => {
        if (currentGoal) {
            setFormState({
                id: currentGoal.id,
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
            console.log('edit: ', formState);
            dispatch(updateGoal(formState));
        } else {
            console.log('create: ', formState);
            dispatch(createGoal(formState));
        }
        onCloseModal();
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
    }


    return {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    }
}