import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import {Edit} from "@mui/icons-material";
import UpdateAppBar from "../../../layouts/UpdateAppBar";
import EditTaskBox from "../../../pages/task/EditTaskBox";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const EditTaskDialog = ({task}) => {
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

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{ transition: Transition }}
            >
                <UpdateAppBar handleClose={handleClose} handleSave={handleSave}/>

                <EditTaskBox task={task}/>
            </Dialog>
        </>
    );
};

export default EditTaskDialog;