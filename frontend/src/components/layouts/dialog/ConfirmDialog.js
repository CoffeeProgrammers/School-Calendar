import React from 'react';
import {Box, Button, DialogActions} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import theme from "../../../assets/theme";
import {red} from "@mui/material/colors";

const ConfirmDialog = ({open, handleClose, handleConfirm, text}) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle color="primary">
                    {text}
                </DialogTitle>
                <Box mt={-2}>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" sx={{backgroundColor: red["700"], '&:hover': {backgroundColor: red["500"]}, color: "white",}}>
                            No
                        </Button>
                        <Button onClick={handleConfirm} variant="contained" sx={{backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor: theme.palette.secondary.light}, color: "white",}}>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;