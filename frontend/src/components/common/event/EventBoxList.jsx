import React from 'react';
import {Box, Divider, Typography} from "@mui/material";

//TODO: text only in one line
const EventBoxList = ({event}) => {
    return (
        <Box  style={{border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "12px"}}>
            <Typography variant="subtitle1">{event.name}</Typography>
            <Divider sx={{marginBottom: "5px"}}/>
            <Typography variant="body2"><strong>Type:</strong> {event.type}</Typography>
            <Typography variant="body2"><strong>Start:</strong> {event.start_date}</Typography>
            <Typography variant="body2"><strong>End:</strong> {event.end_date}</Typography>
            <Typography variant="body2"><strong>Place:</strong> {event.place}</Typography>
            <Typography variant="body2"><strong>Creator:</strong> {event.creator.first_name} {event.creator.last_name}</Typography>
        </Box>
    );
};

export default EventBoxList;