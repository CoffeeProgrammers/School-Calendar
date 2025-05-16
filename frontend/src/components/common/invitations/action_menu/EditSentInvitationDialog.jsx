import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../../assets/styles";

const EditSentInvitationDialog = ({open, handleClose, handleEdit, invitationDescription}) => {
    const [description, setDescription] = useState(invitationDescription ?? "")

    const handleSave = () => {
        handleEdit(description)
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle color="primary">
                    {"Update"}
                </DialogTitle>

                <Box mt={-3}>
                    <DialogContent>
                        <TextField
                            label={"Enter a new description"}
                            value={description}
                            fullWidth
                            variant="filled"
                            multiline
                            maxRows={5}
                            onChange={(event) => {setDescription(event.target.value);}}
                        />
                    </DialogContent>

                    <Box mt={-2}>
                        <DialogActions>
                            <Button variant="contained" sx={disagreeButtonStyles} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={defaultButtonStyles} onClick={handleSave}>
                                Save
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Dialog>
        </>


    );
};

export default EditSentInvitationDialog;