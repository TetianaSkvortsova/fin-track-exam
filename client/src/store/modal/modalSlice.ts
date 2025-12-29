import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ModalType =
    'REGISTER' |
    'LOGIN' |
    'NEW_CATEGORY_FORM' |
    'EDIT_CATEGORY' |
    'ADD_TRANSACTION' |
    'EDIT_TRANSACTION' |
    'ADD_GOAL' |
    'EDIT_GOAL' |
    'SPEND' |
    'NONE';

type ModalState = {
    modalType: ModalType;
    isOpen: boolean;
}

const initialState: ModalState = {
    modalType: 'NONE',
    isOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ type: ModalType}>) => {
            state.modalType = action.payload.type;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalType = 'NONE';
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;