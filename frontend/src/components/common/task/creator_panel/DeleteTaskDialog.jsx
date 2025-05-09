import React, {useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import ConfirmDialog from "../../../layouts/dialog/ConfirmDialog";
import TaskService from "../../../../services/ext/TaskService";
import {useNavigate} from "react-router-dom";

const DeleteTaskDialog = ({taskId}) => {
    const navigate = useNavigate();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const onConfirmDelete = async () => {
        await TaskService.deleteTask(taskId)
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