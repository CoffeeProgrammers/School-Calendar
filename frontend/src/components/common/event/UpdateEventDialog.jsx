import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import {Edit} from "@mui/icons-material";
import FullScreenFunctionDialog from "../../layouts/FullScreenFunctionDialog";
import UpdateAppBar from "../../layouts/update/UpdateAppBar";
import UpdateEventBox from "./UpdateEventBox";

const UpdateEventDialog = ({event, handleUpdate}) => {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState(event.name);
    const [place, setPlace] = useState(event.place);
    const [content, setContent] = useState(event.content);
    const [meetingType, setMeetingType] = useState(event.meetingType);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = () => {
        const updatedEvent = {
            name: name,
            meetingType: meetingType,
            place: place,
            content: content
        }
        handleUpdate(updatedEvent)
        setOpen(false);
    }

    return (
        <>
            <IconButton
                onClick={handleClickOpen} color="secondary"
                sx={{borderRadius: '5px', width: '30px', height: '30px'}}
            >
                <Edit/>
            </IconButton>

            <FullScreenFunctionDialog open={open} handleClose={handleClose}>
                <UpdateAppBar handleClose={handleClose} handleSave={handleSave}/>
                <UpdateEventBox
                    name={name}
                    setName={setName}
                    place={place}
                    setPlace={setPlace}
                    meetingType={meetingType}
                    setMeetingType={setMeetingType}
                    content={content}
                    setContent={setContent}
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default UpdateEventDialog;