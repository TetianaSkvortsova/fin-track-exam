import { useState } from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {openModal} from "../store/modal/modalSlice.ts";
import type {RootState} from "../store/store.ts";
import {logout} from "../store/user/userSlice.ts";

export type UseHeaderLogic = {
    auth: boolean;
    anchorEl: HTMLElement | null;
    totalBalance: number;
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseMenu: () => void;
    handleSignUpClick: () => void;
    handleLogOut: () => void;
}

export const useHeaderLogic = (): UseHeaderLogic => {
    const auth = useAppSelector((state: RootState) => state.user.isAuthenticated);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    const totalBalance = 12500;

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Close user icon menu
    const handleSignUpClick = () => {
        dispatch(openModal({ type: 'REGISTER' }));
    }

    const handleLogOut = () => {
        setAnchorEl(null);
        dispatch(logout());
        sessionStorage.removeItem('token');
    };

    //Open menu user icon
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return {
        auth,
        anchorEl,
        totalBalance,
        handleMenu,
        handleCloseMenu,
        handleSignUpClick,
        handleLogOut,
    };
};