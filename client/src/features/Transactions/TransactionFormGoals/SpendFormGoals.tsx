import * as React from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../../constants/textConstants.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useSpendFormGoalsLogic} from "./useSpendFormGoalsLogic.ts";

type GoalsFormProps = {
    onCloseModal: () => void;
}
const SpendFormGoals: React.FC<GoalsFormProps> = ({onCloseModal})=>  {
    const {
        handleSubmit,
        handleCancel,
        handleChange,
        currentGoal,
        formState,
    } = useSpendFormGoalsLogic({onCloseModal});

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}>
            <Typography variant="h5" gutterBottom align="center">
                {TEXT.FORMS.GOAL_FORM_TITLE_SPEND}
            </Typography>
            <Grid container spacing={2}>
                <TextField
                    fullWidth
                    disabled
                    label={TEXT.FORMS.NAME}
                    name="name"
                    defaultValue={currentGoal?.name}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Choose target date"
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
                >
                    {currentGoal ? TEXT.BUTTONS.SAVE : TEXT.BUTTONS.CREATE }
                </Button>
            </Box>
        </Box>
    );
}

export default SpendFormGoals;