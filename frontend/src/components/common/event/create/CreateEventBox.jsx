import React from 'react';
import {Box, Container, Divider, MenuItem, TextField} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import DefaultDateTimePicker from "../../../layouts/DefaultDateTimePicker";
import {eventTypes} from "../../../../utils/constants";

const CreateEventBox = (
    {
        name,
        setName,
        type,
        setType,
        place,
        setPlace,
        meetingType,
        setMeetingType,
        content,
        setContent,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isContentAvailableAnytime,
        setIsContentAvailableAnytime
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
                            Event Create
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
                            label="Type"
                            fullWidth
                            variant="outlined"
                            select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {eventTypes.map((eventType) => (
                                <MenuItem key={eventType.value} value={eventType.value}>
                                    {eventType.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Meeting type"
                            fullWidth
                            variant="outlined"
                            select
                            value={meetingType}
                            onChange={(e) => setMeetingType(e.target.value)}
                        >
                            <MenuItem value="ONLINE">Online</MenuItem>
                            <MenuItem value="OFFLINE">Offline</MenuItem>
                        </TextField>

                        <TextField
                            label="Place"
                            fullWidth
                            variant="outlined"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />



                        <TextField
                            label="Is content available anytime?"
                            fullWidth
                            variant="outlined"
                            select
                            value={isContentAvailableAnytime}
                            onChange={(e) => setIsContentAvailableAnytime(e.target.value)}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </TextField>

                        <TextField
                            label="Content"
                            fullWidth
                            variant="outlined"
                            multiline
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <DefaultDateTimePicker
                            label={"Start Date"}
                            value={startDate}
                            setValue={setStartDate}
                        />

                        <DefaultDateTimePicker
                            label={"End Date"}
                            value={endDate}
                            setValue={setEndDate}
                        />

                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default CreateEventBox;