import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import type {CategoryTypes, ResponseDate} from "../../../types";
import {useEffect, useState} from "react";
import {getCategories, getCategoriesByType} from "../../../store/category/categorySlice.ts";
import {getTransactionsByUser} from "../../../store/transactions/transactionsSlice.ts";
import {Dayjs} from 'dayjs';

type initialRequestState = {
    categoryType: string,
    category: string,
    startDate: string,
    endDate: string,
}

const initialState = {
    categoryType: '',
    category: '',
    startDate: '',
    endDate: '',
}

const useTransactionHeaderLogic = () => {
    const dispatch = useAppDispatch();
    const categoryTypes = useAppSelector(state => state.categories.types);
    const categories = useAppSelector(state => state.categories.categories);
    const [requestTransactions, setRequestTransactions] = useState<initialRequestState>(initialState);
    const [categoryType, setCategoryType] = useState<CategoryTypes | null>(null);
    const [category, setCategory] = useState<ResponseDate | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(getTransactionsByUser(requestTransactions));
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [requestTransactions, dispatch]);

    const handleTypeChange = (newValue: CategoryTypes | null) => {
        if (!newValue) {
            setCategoryType(null);
            setRequestTransactions({...requestTransactions, categoryType: ''});
            dispatch(getCategories());
            return;
        }
        setCategoryType(newValue);
        setRequestTransactions({...requestTransactions, categoryType: `categoryTypeId=${newValue.id}`, category: ''});
        setCategory(null);
        dispatch(getCategoriesByType(newValue.id));
    }

    const handleCategoryChange = (newValue: ResponseDate | null) => {
        if (!newValue) {
            setCategory(null);
            setRequestTransactions({...requestTransactions, category: ''});
            return;
        }
        setCategory(newValue);
        setRequestTransactions({...requestTransactions, category: `categoryId=${newValue.id}`});
    }

    const handleDateChange = (start: Dayjs | null, end: Dayjs | null) => {
        setStartDate(start);
        setEndDate(end);

        const whenFrom = start ? `whenFrom=${start.format('YYYY-MM-DD')}` : '';
        const whenTo = end ? `whenTo=${end.format('YYYY-MM-DD')}` : '';

        setRequestTransactions(prev => ({
            ...prev,
            startDate: whenFrom,
            endDate: whenTo
        }));
    }

    return {
        handleTypeChange,
        handleCategoryChange,
        handleDateChange,
        categoryTypes,
        categories,
        categoryType,
        category,
        startDate,
        endDate,
    }
};

export default useTransactionHeaderLogic;
