import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import type { CategoryTypes, ResponseDate} from "../../../types";
import {
    getTransactionsByCategoryType, getTransactionsByDate,
    getTransactionsByUser,
    setTransactionsByCategory
} from "../../../store/transactions/transactionsSlice.ts";
import {useEffect, useState} from "react";
import {getCategories, getCategoriesByType} from "../../../store/category/categorySlice.ts";
import { Dayjs } from 'dayjs';

const useTransactionHeaderLogic = () => {
    const dispatch = useAppDispatch();
    const categoryTypes = useAppSelector(state => state.categories.types);
    const categories = useAppSelector(state => state.categories.categories);
    const [categoryType, setCategoryType] = useState<CategoryTypes | null>(null);
    const [category, setCategory] = useState<ResponseDate | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleTypeChange = async (newValue: CategoryTypes | null) => {
        setCategoryType(newValue);
        setCategory(null);

        if (newValue) {
            await dispatch(getTransactionsByCategoryType(newValue.id)).unwrap();
            dispatch(getCategoriesByType(newValue.id));
        } else {
            dispatch(getTransactionsByUser());
            dispatch(getCategories());
        }
    };

    const handleCategoryChange = (newValue: ResponseDate | null) => {
        setCategory(newValue);

        if (newValue) {
            dispatch(setTransactionsByCategory(newValue.id));
        } else {
            if (categoryType) {
                dispatch(getTransactionsByCategoryType(categoryType.id));
            } else {
                dispatch(getTransactionsByUser());
            }
        }
    };

    const handleDateChange = (start: Dayjs | null, end: Dayjs | null) => {
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const formattedStart = start.format('YYYY-MM-DD');
            const formattedEnd = end.format('YYYY-MM-DD');
            dispatch(getTransactionsByDate({dateFrom: formattedStart, dateTo: formattedEnd}));
            console.log("Відправляємо на бекенд:", formattedStart, formattedEnd);
        }
    };

    return {
        handleTypeChange,
        handleCategoryChange,
        handleDateChange,
        categoryTypes,
        categoryType,
        categories,
        category,
        startDate,
        endDate,
    }
};

export default useTransactionHeaderLogic;
