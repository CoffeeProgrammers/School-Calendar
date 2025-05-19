import React from 'react';
import {Box, Container, Divider, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import theme from "../../../../assets/theme";

const UpdateUserBox = (
        {
            firstName,
            setFirstName,
            lastName,
            setLastName,
            description,
            setDescription,
            birthdayDate,
            setBirthdayDate

        }) => {


        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    width: "725px",
                    display: 'flex',
                    border: '1px solid #ddd',
                    padding: '20px',
                    margin: '10px',
                    borderRadius: "10px",
                    flexDirection: "column"
                }}>
                    <Container maxWidth={"md"}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                            <AssignmentIcon fontSize="medium" color="secondary"/>
                            <Typography variant="h6">
                                User Update
                            </Typography>
                        </Box>

                        <Divider sx={{mt: 1, mb: 1}}/>

                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                            <TextField
                                multiline
                                label="First Name"
                                fullWidth
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                multiline
                                label="Last Name"
                                fullWidth
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />



                            <TextField
                                label="Description"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <DateTimePicker
                                label="Birthday"
                                views={['year', 'month', 'day']}
                                defaultValue={birthdayDate ? dayjs(birthdayDate) : null}
                                onChange={(newValue) => setBirthdayDate(newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null)}
                                slotProps={{
                                    textField: {
                                        sx: {
                                            '& .MuiInputAdornment-root .MuiIconButton-root': {
                                                color: theme.palette.secondary.main,
                                            },
                                            '& .MuiInputAdornment-root .MuiIconButton-root:hover': {
                                                color: theme.palette.secondary.light,
                                            },
                                        },
                                    }
                                }}
                            />

                        </Box>
                    </Container>
                </Box>
            </Box>
        );
    }
;

export default UpdateUserBox;