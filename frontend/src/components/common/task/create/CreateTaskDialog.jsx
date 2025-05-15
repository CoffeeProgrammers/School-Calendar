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
        handleCreate({
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
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default CreateTaskDialog;