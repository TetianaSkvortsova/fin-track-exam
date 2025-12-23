import {useState} from "react";
import type {Goal} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import * as React from "react";
import {createGoal} from "../../store/goals/goalsSlice.ts";

type GoalsFormProps = {
    onCloseModal: () => void;
}

export const useGoalsFormLogic = ({onCloseModal}: GoalsFormProps) => {
    const dispatch = useAppDispatch();
    const currentGoal = useAppSelector(state => state.categories.currentCategory);
    const [formState, setFormState] = useState<Goal>({
        id: '',
        name: '',
        targetAmount: '',
        targetDate: '',
        balance: '0',
    });

    const handleSubmit = () => {
        dispatch(createGoal(formState));
        onCloseModal();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const normalizedValue = name === 'targetAmount' ? value.replace(',', '.') : value;
        if(name === 'targetAmount') {
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