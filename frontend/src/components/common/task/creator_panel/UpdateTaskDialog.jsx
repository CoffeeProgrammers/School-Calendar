import * as React from 'react';
import {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import TaskFormBox from "../TaskFormBox";
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";

const UpdateTaskDialog = ({task, handleUpdate}) => {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);
    const [content, setContent] = useState(task.content);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSave = () => {
        handleUpdate({
            name: name,
            deadline: deadline,
            content: content
        })
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
                <FullScreenDialogAppBar handleClose={handleClose} handleSave={handleSave}/>
                <TaskFormBox
                    boxName={"Update Task"}
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

export default UpdateTaskDialog;