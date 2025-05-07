import React, {useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import ConfirmDialog from "../../../layouts/dialog/ConfirmDialog";
import TaskService from "../../../../services/ext/TaskService";
import {useNavigate, useParams} from "react-router-dom";

const DeleteTaskDialog = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onConfirmDelete = async () => {
        console.log(id)
        await TaskService.deleteTask(id)
        setOpenConfirmDialog(false)
        navigate('/tasks')
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