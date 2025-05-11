import React from 'react';
import {Box, Container, Divider, MenuItem, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";

const UpdateEventBox = (
    {
        name,
        setName,
        place,
        setPlace,
        meetingType,
        setMeetingType,
        content,
        setContent
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

                        <TextField
                            label="Place"
                            fullWidth
                            variant="outlined"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                        <TextField
                            label="Meeting type"
                            fullWidth
                            variant="outlined"
                            select
                            value={meetingType}
                            onChange={(e) => setMeetingType(e.target.value)}
                        >
                            <MenuItem value="ONLINE">Online</MenuItem>
                            {/*TODO: OFFLINE*/}
                            <MenuItem value="OFFLINE_REAL">Offline</MenuItem>
                        </TextField>
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