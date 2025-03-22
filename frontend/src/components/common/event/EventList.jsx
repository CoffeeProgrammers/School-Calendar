import React from 'react';
import {Grid} from "@mui/material";
import EventBox from "./EventBox";

const EventList = ({events}) => {
    return (
        <Grid container spacing={1.5}>
            {events.map(event => (
                <Grid item xs={15} sm={6} md={5} lg={2.4} key={event.id}>
                    <EventBox event={event}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;