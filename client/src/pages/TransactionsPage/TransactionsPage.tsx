import {TEXT} from "../../constants/textConstants.ts";
import '../../styles/styles.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {getTransactionsByUser} from "../../store/transactions/transactionsSlice.ts";
import TransactionsDataGrid from "../../components/TransactionsDataGrid/TransactionsDataGrid.tsx";
import TransactionsHeader from "../../features/Transactions/TransactionsHeader/TransactionsHeader.tsx";

function TransactionsPage() {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transactions.transactions);

    useEffect(() => {
        dispatch(getTransactionsByUser());
        // dispatch(getTransactionsByUser());
    }, [dispatch]);

    return (
        <div className={'page-wrapper'}>
            <h1>{TEXT.TITLES.TRANSACTIONS_PAGE}</h1>
            <TransactionsHeader />
            <TransactionsDataGrid transactions={transactions}/>
        </div>
    );
}

export default TransactionsPage;