import './App.scss'
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import AppModal from "../AppModal/AppModal.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setAuthToken} from "../../store/user/userSlice.ts";
import {
    deleteCategory,
    getCategoryTypes
} from "../../store/category/categorySlice.ts";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {closeDialog} from "../../store/confirmationDialog/confirmationDialogSlice.ts";
import {deleteTransaction, getTransactionsByUser} from "../../store/transactions/transactionsSlice.ts";
import Menu from "../Menu/Menu.tsx";
import {deleteGoal, getGoals} from "../../store/goals/goalsSlice.ts";

function App() {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.user.isAuthenticated);
    const {open, title, description, confirmText, idToDelete, actionType} = useAppSelector(state => state.dialog);
    const requestData = {
        categoryType: '',
        category: '',
        startDate: '',
        endDate: '',
    }

    useEffect(() => {
        dispatch(setAuthToken());
        if (isAuth) {
            dispatch(getCategoryTypes());
            dispatch(getTransactionsByUser(requestData));
            dispatch(getGoals());
        }
    }, [dispatch, isAuth]);

    const handleConfirm = () => {
        if (idToDelete) {
            if (actionType === 'DELETE_CATEGORY') {
                dispatch(deleteCategory(idToDelete));
            } else if (actionType === 'DELETE_TRANSACTION') {
                dispatch(deleteTransaction(idToDelete));
            } else if (actionType === 'DELETE_GOAL') {
                dispatch(deleteGoal(idToDelete));
            }
        }
        dispatch(closeDialog());
    };

    return (
        <>
            <Header/>
            <div className={'content-wrapper'}>
                {isAuth && <Menu/>}
                <Content/>
            </div>

            <AppModal/>
            <ConfirmationDialog
                open={open}
                onClose={() => dispatch(closeDialog())}
                onConfirm={handleConfirm}
                title={title}
                description={description}
                confirmText={confirmText}/>

        </>
    )
}

export default App
