import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";
import UpdateAppBar from "../../../layouts/update/UpdateAppBar";
import UpdateTaskBox from "../UpdateTaskBox";
import FullScreenFunctionDialog from "../../../layouts/FullScreenFunctionDialog";

const UpdateTaskDialog = ({task}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        //TODO: handleSave
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
                <UpdateTaskBox task={task}/>
            </FullScreenFunctionDialog>
        </>
    );
};

export default UpdateTaskDialog;