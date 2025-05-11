import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../layouts/dialog/ConfirmDialog";

const EventDeleteDialog = ({eventId, handleDelete}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onConfirmDelete = async () => {
        handleDelete(eventId)
        setOpenConfirmDialog(false)

    }
    const onCancelDelete = () => {
        setOpenConfirmDialog(false)
    }

    return (
        <>
            <IconButton onClick={() => setOpenConfirmDialog(true)} color="secondary" sx={{borderRadius: '5px', width: '30px', height: '30px'}}>
                <DeleteIcon />
            </IconButton>

            <ConfirmDialog
                open={openConfirmDialog}
                text={"Are you sure you want to delete this task?"}
                handleConfirm={onConfirmDelete}
                handleClose={onCancelDelete}

            />
        </>
    );
};

export default EventDeleteDialog;