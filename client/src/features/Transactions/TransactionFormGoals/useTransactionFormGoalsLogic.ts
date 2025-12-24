import {useAppSelector} from "../../../store/hooks.ts";
import type {Goal, TopUpGoal} from "../../../types";
import {useState} from "react";
import moment from "moment";
import * as React from "react";

type UseTransactionFormGoalsLogicFormProps = {
    onCloseModal: () => void;
}
export const useTransactionFormGoalsLogic = ({onCloseModal}: UseTransactionFormGoalsLogicFormProps) => {
    const currentGoal = useAppSelector(state => state.goals.currentGoal) as Goal | null;
    const [formState, setFormState] = useState<TopUpGoal>({
        id: currentGoal?.id || '',
        name: currentGoal?.name || '',
        amount: '0.00',
        when: moment().format('YYYY-MM-DD'),
        description: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submit: ', formState);
        onCloseModal();
    }

    const handleCancel = () => {
        onCloseModal();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const normalizedValue = name === 'amount' ? value.replace(',', '.') : value;
        if (name === 'amount') {
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

    return {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    }
};