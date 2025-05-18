import React, {useState} from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {Box, IconButton, Typography} from "@mui/material";
import ConfirmDialog from "../../layouts/dialog/ConfirmDialog";

const LeaveFromEventDialog = ({handleUserLeaveFromEvent}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onConfirmDelete = async () => {
        handleUserLeaveFromEvent()
        setOpenConfirmDialog(false)

    }
    const onCancelDelete = () => {
        setOpenConfirmDialog(false)
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',}}>
            <Typography variant="body1" color="primary">Participant panel</Typography>

            <Box sx={{display: 'flex'}}>
                <IconButton onClick={() => setOpenConfirmDialog(true)} color="secondary"
                            sx={{borderRadius: '5px', width: '30px', height: '30px'}}>
                    <LogoutIcon/>
                </IconButton>

                <ConfirmDialog
                    open={openConfirmDialog}
                    text={"Are you sure you want to leave from this event?"}
                    handleConfirm={onConfirmDelete}
                    handleClose={onCancelDelete}
                />
            </Box>
        </Box>
    );
}

export default LeaveFromEventDialog;