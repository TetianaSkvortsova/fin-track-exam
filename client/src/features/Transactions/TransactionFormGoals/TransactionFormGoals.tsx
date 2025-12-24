import * as React from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../../constants/textConstants.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useTransactionFormGoalsLogic} from "./useTransactionFormGoalsLogic.ts";

type GoalsFormProps = {
    onCloseModal: () => void;
}
const TransactionFormGoals: React.FC<GoalsFormProps> = ({onCloseModal})=>  {
    const {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    } = useTransactionFormGoalsLogic({onCloseModal});

    const isError = formState.amount !== '' && !/^\d*[.,]?\d*$/.test(formState.amount);
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}>
            <Typography variant="h5" gutterBottom align="center">
                {currentGoal ? TEXT.FORMS.GOAL_FORM_TITLE_UPDATE : TEXT.FORMS.GOAL_FORM_TITLE}
            </Typography>
            <Grid container spacing={2}>
                <TextField
                    fullWidth
                    label={TEXT.FORMS.NAME}
                    name="name"
                    value={formState.name}
                    // onChange={handleChange}
                    disabled
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.AMOUNT}
                    name="amount"
                    value={formState.amount}
                    onChange={handleChange}
                    error={isError}
                    helperText={isError ? "Please enter only numbers" : ""}
                    slotProps={{
                        htmlInput: {
                            inputMode: 'decimal',
                            step: "0.01"
                        }
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Choose target date"
                        // disablePast
                        value={formState.when ? dayjs(formState.when) : null}

                        onChange={(newValue) => {
                            const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                            handleChange({
                                target: {name: 'when', value: formattedDate}
                            } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        maxDate={dayjs()}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true,
                            },
                        }}
                    />
                </LocalizationProvider>

                <TextField
                    fullWidth
                    label={TEXT.FORMS.DESCRIPTION}
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                />

            </Grid>
            {/* Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                >
                    {TEXT.BUTTONS.CANCEL}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isError}
                >
                    {currentGoal ? TEXT.BUTTONS.SAVE : TEXT.BUTTONS.CREATE }
                </Button>
            </Box>
        </Box>
    );
}

export default TransactionFormGoals;