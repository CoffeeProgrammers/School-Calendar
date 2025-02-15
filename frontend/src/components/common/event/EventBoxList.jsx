import React from 'react';
import {Box, Divider, Typography} from "@mui/material";

const EventBoxList = ({event}) => {
    return (
        <Box style={{border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "12px"}}>
            <Typography variant="h5">{event.name}</Typography>
            <Divider/>
            <Typography><strong>Type:</strong> {event.type}</Typography>
            <Typography><strong>Start:</strong> {event.start_date}</Typography>
            <Typography><strong>End:</strong> {event.end_date}</Typography>
            <Typography><strong>Place:</strong> {event.place}</Typography>
            <Typography><strong>Creator:</strong> {event.creator.first_name} {event.creator.last_name}</Typography>
        </Box>
    );
};

export default EventBoxList;