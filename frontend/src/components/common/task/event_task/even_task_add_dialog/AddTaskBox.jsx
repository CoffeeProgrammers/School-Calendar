import React, {useState} from 'react';
import {Box} from "@mui/material";
import ConfirmDialog from "../../../../layouts/dialog/ConfirmDialog";
import TaskBox from "../../TaskBox";

const AddTaskBox = ({task, handleAdd}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const onConfirmInvite = () => {
        handleAdd(task)
        console.log("Add");
        setOpenConfirmDialog(false);
    }

    const onCancelInvite = () => {
        console.log("Cancel");
        setOpenConfirmDialog(false);
    }

    return (
        <>
            <Box onClick={() => setOpenConfirmDialog(true)}>
                <TaskBox task={task}/>
            </Box>

            <ConfirmDialog
                open={openConfirmDialog}
                text={"Are you sure you want to add this task?"}
                handleConfirm={onConfirmInvite}
                handleClose={onCancelInvite}
            />
        </>

    );
};

export default AddTaskBox;