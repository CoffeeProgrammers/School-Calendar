import React, {useState} from 'react';
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import TaskFormBox from "../TaskFormBox";
import {Button} from "@mui/material";
import {defaultButtonStyles} from "../../../../assets/styles";

const CreateTaskDialog = ({handleCreate}) => {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [content, setContent] = useState('');

    const [event, setEvent] = useState('');


    const clearFields = () => {
        setName('');
        setDeadline('');
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
        handleCreate(event.id, {
            name: name,
            deadline: deadline,
            content: content
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
                <TaskFormBox
                    boxName={"Create Task"}
                    name={name}
                    setName={setName}
                    deadline={deadline}
                    setDeadline={setDeadline}
                    content={content}
                    setContent={setContent}
                    event={event}
                    setEvent={setEvent}
                    isCreate={true}
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default CreateTaskDialog;