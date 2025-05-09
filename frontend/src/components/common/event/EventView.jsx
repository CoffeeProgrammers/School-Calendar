import React from 'react';
import EventPageMainBox from "../user/EventPageMainBox";
import EventCreatorPanel from "./EventCreatorPanel";
import {Box, Divider} from "@mui/material";

const EventView = ({event}) => {

    return (
        <Box sx={{width: "850px", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <EventCreatorPanel event={event}/>
            <Divider sx={{width: '100%', mb: 0.5}}/>
            <EventPageMainBox event={event}/>
        </Box>
    );
};

export default EventView;