import React from 'react';
import IconButton from "@mui/material/IconButton";
import FullScreenFunctionDialog from "../../../layouts/FullScreenFunctionDialog";
import UpdateAppBar from "../../../layouts/update/UpdateAppBar";
import UpdateUserBox from "./UpdateUserBox";
import SettingsIcon from '@mui/icons-material/Settings';

const UpdateUserDialog = ({user}) => {
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
                <SettingsIcon/>
            </IconButton>

            <FullScreenFunctionDialog open={open} handleClose={handleClose}>
                <UpdateAppBar handleClose={handleClose} handleSave={handleSave}/>
                <UpdateUserBox user={user}/>
            </FullScreenFunctionDialog>
        </>
    );
};

export default UpdateUserDialog;