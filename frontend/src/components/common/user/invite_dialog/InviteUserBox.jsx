import React, {useState} from 'react';
import UserBox from "../UserBox";
import {Box} from "@mui/material";
import ConfirmDialog from "../../../layouts/dialog/ConfirmDialog";

const InviteUserBox = ({user, handleInvite}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const onConfirmInvite = () => {
        handleInvite(user)
        console.log("Invite");
        setOpenConfirmDialog(false);
    }

    const onCancelInvite = () => {
        console.log("Cancel");
        setOpenConfirmDialog(false);
    }

    return (
        <>
            <Box onClick={() => setOpenConfirmDialog(true)}>
                <UserBox user={user}/>
            </Box>

            <ConfirmDialog
                open={openConfirmDialog}
                text={"Are you sure you want to invite this person?"}
                handleConfirm={onConfirmInvite}
                handleClose={onCancelInvite}
            />
        </>

    );
};

export default InviteUserBox;