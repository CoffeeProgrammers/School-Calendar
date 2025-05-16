import React, {useState} from 'react';
import {Divider, IconButton, Menu, MenuItem} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../../../layouts/dialog/ConfirmDialog";
import EditSentInvitationDialog from "./EditSentInvitationDialog";

const SentInvitationActionMenu = ({invitation, handleEditInvitation, handleDeleteInvitation}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)


    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionEdit = () => {
        setOpenEditDialog(true)
        handleClose()
    };

    const handleOptionDelete = () => {
        setOpenConfirmDialog(true);
        handleClose();
    };

    const handleConfirmDeleteDialog = async () => {
        handleDeleteInvitation()
        handleCloseConfirmDeleteDialog()
    };

    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDialog(false)
        handleClose()
    };

    const handleSaveEditDialog = async (description) => {
        handleEditInvitation(description)
        setOpenEditDialog(false)
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false)
    };


    return (
        <>
            <IconButton onClick={handleOpen}>
                <EditIcon fontSize="small"/>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleOptionEdit}>Edit</MenuItem>
                <Divider/>
                <MenuItem onClick={handleOptionDelete}>Delete</MenuItem>
            </Menu>


            <EditSentInvitationDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                handleEdit={handleSaveEditDialog}
                invitationDescription={invitation.description}
            />

            <ConfirmDialog
                open={openConfirmDialog}
                handleClose={handleCloseConfirmDeleteDialog}
                handleConfirm={handleConfirmDeleteDialog}
                text={"Are you sure want to delete this invitation?"}
            />
        </>
    );
}

export default SentInvitationActionMenu;