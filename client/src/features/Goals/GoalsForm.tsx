import * as React from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../constants/textConstants.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useGoalsFormLogic} from "./useGoalsFormLogic.ts";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

type GoalsFormProps = {
    onCloseModal: () => void;
}

const GoalsForm: React.FC<GoalsFormProps> = ({onCloseModal}) => {
    const {
        handleSubmit,
        handleChange,
        handleCancel,
        formState,
        currentGoal,
    } = useGoalsFormLogic({onCloseModal});

    const isError = formState.targetAmount !== '' && !/^\d*[.,]?\d*$/.test(formState.targetAmount);
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
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.AMOUNT}
                    name="targetAmount"
                    value={formState.targetAmount}
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
                        disablePast
                        value={formState.targetDate ? dayjs(formState.targetDate) : null}

                        onChange={(newValue) => {
                            const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                            handleChange({
                                target: {name: 'targetDate', value: formattedDate}
                            } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        minDate={dayjs()}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true,
                            },
                        }}
                    />
                </LocalizationProvider>

            </Grid>

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
    )
}

export default GoalsForm;