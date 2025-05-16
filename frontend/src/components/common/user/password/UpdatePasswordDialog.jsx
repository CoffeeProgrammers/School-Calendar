import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import LockResetIcon from '@mui/icons-material/LockReset';
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import UpdatePasswordBox from "./UpdatePasswordBox";

const UpdatePasswordDialog = ({handleUpdatePassword}) => {
    const [open, setOpen] = React.useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [password, setPassword] = useState('');
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (newPassword === confirmNewPassword) {
            handleUpdatePassword(password, newPassword)
            setOpen(false);
        }else {
            //TODO: handle
            throw new Error("Passwords do not match")
        }

    }

    return (
        <>
            <IconButton
                onClick={handleClickOpen} color="secondary"
                sx={{borderRadius: '5px', width: '30px', height: '30px'}}
            >
                <LockResetIcon/>
            </IconButton>

            <FullScreenFunctionDialog open={open} handleClose={handleClose}>
                <FullScreenDialogAppBar handleClose={handleClose} handleSave={handleSave}/>
                <UpdatePasswordBox
                    newPassword={newPassword}
                    confirmNewPassword={confirmNewPassword}
                    password={password}
                    setNewPassword={setNewPassword}
                    setConfirmNewPassword={setConfirmNewPassword}
                    setPassword={setPassword}
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default UpdatePasswordDialog;