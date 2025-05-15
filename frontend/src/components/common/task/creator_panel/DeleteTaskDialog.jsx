import React, {useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import ConfirmDialog from "../../../layouts/dialog/ConfirmDialog";

const DeleteTaskDialog = ({handleDelete}) => {

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onConfirmDelete =  () => {
        handleDelete()
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

export default DeleteTaskDialog;