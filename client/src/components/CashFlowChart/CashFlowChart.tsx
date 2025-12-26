import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {useAppSelector} from "../../store/hooks.ts";
import dayjs from "dayjs";
import type {Transaction} from "../../types";
import {useMemo} from "react";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";

const prepareChartData = (transactions: Transaction[]) => {
    const groupedData = transactions.reduce((acc, transaction) => {
        const monthKey = dayjs(transaction.when).startOf('month').format('YYYY-MM-DD');
        const amount = parseFloat(transaction.amount);

        if (!acc[monthKey]) {
            acc[monthKey] = {
                dateKey: monthKey,
                name: dayjs(transaction.when).format('MMMM'),
                income: 0,
                expenses: 0
            };
        }

        if (transaction.categoryTypeId === INCOME_CATEGORY_ID) {
            acc[monthKey].income += amount;
        } else if (transaction.categoryTypeId === EXPENSE_CATEGORY_ID) {
            acc[monthKey].expenses += amount;
        }

        return acc;
    }, {});

    return Object.values(groupedData)
        .sort((a, b) => dayjs(a.dateKey).valueOf() - dayjs(b.dateKey).valueOf())
        .map(({ dateKey, ...rest }) => rest);
};

const CashFlowChart = () => {
    const transactions = useAppSelector(state => state.transactions.transactions);

    const rows = useMemo(() => {
        return prepareChartData(transactions);
    }, [transactions]);

    return (
        <BarChart
            style={{width: '100%', maxWidth: '700px', height: '330px', aspectRatio: 1.618}}
            responsive
            data={rows}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis width="auto"/>
            <Tooltip cursor={{ fill: '#ddf5ff' }}/>
            <Legend/>
            <Bar dataKey="income" fill="#57dcd1" activeBar={{
                stroke: '#004d40',
                strokeWidth: 1
            }} radius={[10, 10, 0, 0]}/>
            <Bar dataKey="expenses" fill="#fe7166" activeBar={{
                stroke: '#bf360c',
                strokeWidth: 1
            }} radius={[8, 8, 0, 0]}/>
        </BarChart>
    );
};

export default CashFlowChart;