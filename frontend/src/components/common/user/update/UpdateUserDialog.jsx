import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import UpdateUserBox from "./UpdateUserBox";
import SettingsIcon from '@mui/icons-material/Settings';

const UpdateUserDialog = ({user, handleUpdate}) => {
    const [open, setOpen] = React.useState(false);

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [description, setDescription] = useState(user.description || '');
    const [birthday, setBirthday] = useState(user.birthday || '');
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        handleUpdate({
            firstName: firstName,
            lastName: lastName,
            description: description,
            birthday: birthday
        })
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
                <FullScreenDialogAppBar handleClose={handleClose} handleSave={handleSave}/>
                <UpdateUserBox
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    description={description}
                    setDescription={setDescription}
                    birthdayDate={birthday}
                    setBirthdayDate={setBirthday}
                />
            </FullScreenFunctionDialog>
        </>
    );
};

export default UpdateUserDialog;