import React from 'react';
import {Box, Typography} from "@mui/material";
import UpdateEventDialog from "./UpdateEventDialog";
import EventDeleteDialog from "./EventDeleteDialog";

const EventCreatorPanel = ({event, handleUpdate, handleDelete}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',}}>
            <Typography variant="body1" color="primary">Creator panel</Typography>
            <Box sx={{display: 'flex'}}>
                <UpdateEventDialog event={event} handleUpdate={handleUpdate}/>
                <EventDeleteDialog eventId={event.id} handleDelete={handleDelete}/>
            </Box>
        </Box>
    );
};

export default EventCreatorPanel;