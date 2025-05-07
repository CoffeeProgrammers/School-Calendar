import React from 'react';
import {Box, Grid2} from "@mui/material";
import EventBox from "./EventBox";
import {useNavigate} from "react-router-dom";

const EventList = ({events}) => {
    const navigate = useNavigate();

    return (
        //Todo: list optimize
        <Grid2 container spacing={1.5}>
            {events.map(event => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={event.id}>
                    <Box onClick={() => navigate(`${event.id}`)}>
                        <EventBox event={event}/>
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default EventList;