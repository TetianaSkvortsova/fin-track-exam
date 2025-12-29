import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {TEXT} from "../../../constants/textConstants.ts";
import * as React from "react";
import {useLoginFormLogic} from "../useLoginFormLogic.ts";

type UseLoginFormProps = {
    onCloseModal: () => void;
}

const LoginForm: React.FC<UseLoginFormProps> = ( {onCloseModal}) => {

    const {
        formState,
        authError,
        handleChange,
        handleSubmit,
        handleCancel
    } = useLoginFormLogic({onCloseModal});

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                {TEXT.FORMS.LOGIN}
            </Typography>

            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.EMAIL}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label={TEXT.FORMS.PASSWORD}
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
            </Grid>

            {authError && (
                <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 2, textAlign: 'center', fontWeight: 500 }}
                >
                    {authError}
                </Typography>
            )}

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
                    {TEXT.BUTTONS.LOGIN}
                </Button>
            </Box>
        </Box>
    );
}

export default LoginForm;