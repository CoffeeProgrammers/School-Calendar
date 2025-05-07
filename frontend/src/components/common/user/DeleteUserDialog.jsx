import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import ConfirmDialog from "../../layouts/dialog/ConfirmDialog";

const DeleteUserDialog = () => {

    return (
        <>
            <IconButton color="secondary" sx={{borderRadius: '5px', width: '30px', height: '30px'}}>
                <DeleteIcon />
            </IconButton>

            <ConfirmDialog
               open={}
               text={}
               handleClose={}
               handleConfirm={}
            />
        </>
    );
};

export default DeleteUserDialog;