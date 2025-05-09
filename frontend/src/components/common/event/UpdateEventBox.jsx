import React, {useState} from 'react';
import {Box, Container, Divider, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import theme from "../../../assets/theme";

const UpdateEventBox = ({event}) => {
    const [name, setName] = useState(event.name);
    const [type, setType] = useState(event.type);
    const [startDate, setStartDate] = useState(event.start_date);
    const [endDate, setEndDate] = useState(event.end_date);
    const [place, setPlace] = useState(event.place);
    const [content, setContent] = useState(event.content);

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
                            Event Update
                        </Typography>
                    </Box>

                    <Divider sx={{mt: 1, mb: 1}}/>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                        <TextField
                            multiline
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {/*TODO: Choose type*/}
                        <TextField
                            label="Type"
                            fullWidth
                            variant="outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <DateTimePicker
                            label="Start Date"
                            views={['month', 'day', 'hours', 'minutes']}
                            ampm={false}
                            defaultValue={startDate ? dayjs(startDate) : null}
                            onChange={(newValue) => setStartDate(newValue)}
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
                        <DateTimePicker
                            label="End Date"
                            views={['month', 'day', 'hours', 'minutes']}
                            ampm={false}
                            defaultValue={endDate ? dayjs(endDate) : null}
                            onChange={(newValue) => setEndDate(newValue)}
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
                        <TextField
                            label="Place"
                            fullWidth
                            variant="outlined"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                        <TextField
                            label="Content"
                            fullWidth
                            variant="outlined"
                            multiline
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default UpdateEventBox;