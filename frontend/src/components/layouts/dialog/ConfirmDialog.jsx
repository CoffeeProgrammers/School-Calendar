import React from 'react';
import {Box, Button, DialogActions} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../assets/styles";

const ConfirmDialog = ({open, handleClose, handleConfirm, text}) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle color="primary">
                    {text}
                </DialogTitle>
                <Box mt={-2}>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" sx={disagreeButtonStyles}>
                            No
                        </Button>
                        <Button onClick={handleConfirm} variant="contained" sx={defaultButtonStyles}>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;