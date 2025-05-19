import React from 'react';
import {Box, Grid} from "@mui/material";
import EventListBox from "./EventListBox";
import {useNavigate} from "react-router-dom";

const EventList = ({events}) => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={1.5}>
            {events.map(event => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={event.id}>
                    <Box onClick={() => navigate(`${event.id}`)}>
                        <EventListBox event={event}/>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;