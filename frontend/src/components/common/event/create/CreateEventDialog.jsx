import React, {useState} from 'react';
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import CreateEventBox from "./CreateEventBox";
import {defaultButtonStyles} from "../../../../assets/styles";
import {Button} from "@mui/material";

const CreateEventDialog = ({handleCreate}) => {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState('');
    const [type, setType] = useState('')
    const [meetingType, setMeetingType] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [place, setPlace] = useState('');
    const [isContentAvailableAnytime, setIsContentAvailableAnytime] = useState('')
    const [content, setContent] = useState('');

    const clearFields = () => {
        setName('');
        setType('');
        setMeetingType('');
        setStartDate('');
        setEndDate('');
        setPlace('');
        setIsContentAvailableAnytime('');
        setContent('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearFields()
    };


    const handleSave = () => {
        handleCreate({
            name: name,
            meetingType: meetingType,
            place: place,
            content: content,
            startDate: startDate,
            endDate: endDate,
            type: type,
            isContentAvailableAnytime: isContentAvailableAnytime
        })
        setOpen(false);
        clearFields()
    }

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{...defaultButtonStyles, height: "40px",}}
            >
                New
            </Button>

            <FullScreenFunctionDialog open={open} handleClose={handleClose}>
                <FullScreenDialogAppBar handleClose={handleClose} handleSave={handleSave}/>
                <CreateEventBox
                    name={name}
                    setName={setName}
                    type={type}
                    setType={setType}
                    place={place}
                    setPlace={setPlace}
                    meetingType={meetingType}
                    setMeetingType={setMeetingType}
                    content={content}
                    setContent={setContent}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    isContentAvailableAnytime={isContentAvailableAnytime}
                    setIsContentAvailableAnytime={setIsContentAvailableAnytime}
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default CreateEventDialog;