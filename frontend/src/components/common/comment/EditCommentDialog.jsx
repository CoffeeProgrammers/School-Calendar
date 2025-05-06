import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../assets/styles";

const EditCommentDialog = ({open, handleClose, handleEdit, commentContent}) => {
    const [newText, setNewText] = useState(commentContent)

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
                            label={"Enter a new text"}
                            value={newText}
                            fullWidth
                            variant="filled"
                            multiline
                            maxRows={5}
                            onChange={(event) => {
                                setNewText(event.target.value);
                            }}
                        />
                    </DialogContent>

                    <Box mt={-2}>
                        <DialogActions>
                            <Button variant="contained" sx={disagreeButtonStyles} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={defaultButtonStyles} onClick={() => handleEdit(newText)}>
                                Save
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Dialog>
        </>


    );
};

export default EditCommentDialog;