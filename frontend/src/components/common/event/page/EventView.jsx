import React from 'react';
import EventPageMainBox from "./EventPageMainBox";
import EventCreatorPanel from "../creator_panel/EventCreatorPanel";
import {Box, Divider} from "@mui/material";
import Cookies from "js-cookie";
import LeaveFromEventDialog from "../LeaveFromEventDialog";

const EventView = ({event, handleUpdate, handleDelete, handleUserLeaveFromEvent}) => {
    const isCreator = event.creator.id.toString() === Cookies.get('userId');
    return (
        <Box sx={{width: "850px", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            {isCreator ? (
                <>
                    <EventCreatorPanel event={event} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
                    <Divider sx={{width: '100%', mb: 0.5}}/>
                </>
            ) : (
                <>
                    <LeaveFromEventDialog handleUserLeaveFromEvent={handleUserLeaveFromEvent}/>
                    <Divider sx={{width: '100%', mb: 0.5}}/>
                </>
            )

            }
            <EventPageMainBox event={event} isCreator={isCreator}/>

        </Box>
    );
};

export default EventView;