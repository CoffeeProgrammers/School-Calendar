import React from 'react';
import {Grid} from "@mui/material";
import EventBox from "./EventBox";

const EventList = ({events}) => {
    return (
        //Todo: deprecated + size
        <Grid container spacing={1.5}>
            {events.map(event => (
                <Grid item  xs={12} sm={6} md={4} lg={2.4} key={event.id}>
                    <EventBox event={event}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;