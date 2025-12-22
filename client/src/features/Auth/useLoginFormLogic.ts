import {useState} from "react";
import type { LoginData} from "../../types";
import * as React from "react";
import {clearRegistrationError, loginUser} from "../../store/user/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

type UseLoginFormProps = {
    onCloseModal: () => void;
}

export const useLoginFormLogic = ({onCloseModal}: UseLoginFormProps) => {
    const dispatch = useAppDispatch();
    const authError = useAppSelector(state => state.user.error);
    const [formState, setFormState] = useState<LoginData>({
        email: '',
        password: '',
    });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(loginUser(formState)).unwrap();
            onCloseModal();
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const handleCancel = () => {
        onCloseModal();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        dispatch(clearRegistrationError());
    }

    return {
        formState,
        authError,
        handleChange,
        handleSubmit,
        handleCancel,
    }
};