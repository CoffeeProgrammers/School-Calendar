import React from 'react';
import {Box, Container, Divider, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import DefaultDateTimePicker from "../../layouts/DefaultDateTimePicker";

const TaskCreateBox = (
    {
        name,
        setName,
        deadline,
        setDeadline,
        content,
        setContent,
        boxName
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
                            {boxName}
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
                        <DefaultDateTimePicker
                            label={"Deadline"}
                            value={deadline}
                            setValue={setDeadline}
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

export default TaskCreateBox;