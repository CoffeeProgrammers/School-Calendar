import React from 'react';
import {Box, Grid} from "@mui/material";
import EventBox from "./EventBox";
import {useNavigate} from "react-router-dom";

const EventList = ({events}) => {
    const navigate = useNavigate();

    return (
        //Todo: list optimize
        <Grid container spacing={1.5}>
            {events.map(event => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={event.id}>
                    <Box onClick={() => navigate(`${event.id}`)}>
                        <EventBox event={event}/>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;