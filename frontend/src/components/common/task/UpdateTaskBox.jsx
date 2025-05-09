import React, {useState} from 'react';
import {Box, Container, Divider, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import theme from "../../../assets/theme";

const UpdateTaskBox = ({task}) => {
    const [name, setName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);
    const [content, setContent] = useState(task.content);

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
                            Task Update
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
                        <DateTimePicker
                            label="Deadline"
                            views={['month', 'day', 'hours', 'minutes']}
                            ampm={false}
                            defaultValue={deadline ? dayjs(deadline) : null}
                            onChange={(newValue) => setDeadline(newValue)}
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
                            label="Content"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default UpdateTaskBox;