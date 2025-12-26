import {Autocomplete, type AutocompleteRenderInputParams, Box, TextField} from "@mui/material";
import useTransactionHeaderLogic from "./useTransactionHeaderLogic";
import {TEXT} from "../../../constants/textConstants";
import type {CategoryTypes} from "../../../types";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function TransactionsHeader() {
    const {
        handleTypeChange,
        handleCategoryChange,
        handleDateChange,
        categoryTypes,
        categories,
        // filterTransactions,
        categoryType,
        category,
        startDate,
        endDate,
    } = useTransactionHeaderLogic();
    return (
        <Box
            sx={{
                mb: '20px',
                display: 'flex',
                justifyContent: 'left',
            }}>
            <Autocomplete
                disablePortal
                value={categoryType}
                options={categoryTypes}
                getOptionLabel={(categoryType: CategoryTypes) => categoryType.caption}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="small"
                sx={{width: 220}}
                renderInput={(params: AutocompleteRenderInputParams) =>
                    <TextField {...params} label={TEXT.FORMS.SELECT_CATEGORY_TYPES}/>
                }
                onChange={(_, newValue) => {
                    handleTypeChange(newValue);
                }}>
            </Autocomplete>

            <Autocomplete
                disablePortal
                value={category}
                options={categories}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="small"
                sx={{width: 220, ml: '20px'}}
                renderInput={(params: AutocompleteRenderInputParams) =>
                    <TextField {...params} label={TEXT.FORMS.SELECT_CATEGORY}/>
                }
                onChange={(_, newValue) => {
                    handleCategoryChange(newValue);
                }}>
            </Autocomplete>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="From"
                    format="DD.MM.YYYY"
                    value={startDate}
                    onChange={(newStart) => handleDateChange(newStart, endDate)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            sx: {
                                width: 190,
                                ml: 2
                            }
                        },
                        field: { clearable: true }
                }}
                />
                <DatePicker
                    label="To"
                    format="DD.MM.YYYY"
                    minDate={startDate ?? undefined}
                    value={endDate}
                    onChange={(newEnd) => handleDateChange(startDate, newEnd)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            sx: {
                                width: 190,
                                ml: 2
                            }
                        },
                        field: { clearable: true }
                    }}
                />
            </LocalizationProvider>

        </Box>
    );
}

export default TransactionsHeader;