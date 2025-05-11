import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Divider, IconButton, Menu, MenuItem} from "@mui/material";
import ConfirmDialog from "../../layouts/dialog/ConfirmDialog";
import EditCommentDialog from "./EditCommentDialog";

const CommentActionsMenu = ({handleDeleteComment, handleEditComment, commentContent}) => {
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
        handleDeleteComment()
        handleCloseConfirmDeleteDialog()
    };

    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDialog(false)
        handleClose()
    };

    const handleSaveEditDialog = async (content) => {
        handleEditComment(content)
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
                <Divider />
                <MenuItem onClick={handleOptionDelete}>Delete</MenuItem>
            </Menu>

            <EditCommentDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                handleEdit={handleSaveEditDialog}
                commentContent={commentContent}
            />

            <ConfirmDialog
                open={openConfirmDialog}
                handleClose={handleCloseConfirmDeleteDialog}
                handleConfirm={handleConfirmDeleteDialog}
                text={"Are you sure want to delete this comment?"}
            />
        </>
    );
}

export default CommentActionsMenu;