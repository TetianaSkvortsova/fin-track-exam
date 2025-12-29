import {TEXT} from "../../constants/textConstants.ts";
import '../../styles/styles.scss';
import DashboardGrid from "../../components/DashboardGrid/DashboardGrid.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {getBalanceByCategoryType} from "../../store/balance/balanceSlice.ts";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";
import dayjs from "dayjs";
import {getTransactionsByUser} from "../../store/transactions/transactionsSlice.ts";

function DashboardPage() {
    const dispatch = useAppDispatch();
    const halfYearAgoStart = dayjs()
        .subtract(6, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');

    const startDate = {
        categoryType: '',
        category: '',
        startDate: `whenFrom=${halfYearAgoStart}`,
        endDate: '',
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            dispatch(getBalanceByCategoryType(INCOME_CATEGORY_ID));
            dispatch(getBalanceByCategoryType(EXPENSE_CATEGORY_ID));
            dispatch(getTransactionsByUser(startDate));
        }
    }, [dispatch]);

    return (
        <div className={'page-wrapper'}>
            <h1>{TEXT.TITLES.DASHBOARD_PAGE}</h1>
            <DashboardGrid/>
        </div>

    );
}

export default DashboardPage;