import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import {red} from "@mui/material/colors";
import theme from "../../../assets/theme";
import DialogContent from "@mui/material/DialogContent";

const EditCommentDialog = ({open, handleClose, handleEdit, commentContent}) => {
    const [newText, setNewText] = useState(commentContent)

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color="primary">
                    {"Update"}
                </DialogTitle>

                <Box mt={-3}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            variant="filled"
                            multiline
                            maxRows={5}
                            label={"Enter a new text"}
                            value={newText}
                            onChange={(event) => {
                                setNewText(event.target.value);
                            }}
                        />
                    </DialogContent>
                    <Box mt={-2}>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" sx={{
                                backgroundColor: red["700"],
                                '&:hover': {backgroundColor: red["500"]},
                                color: "white",
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleEdit(newText)} variant="contained" sx={{
                                backgroundColor: theme.palette.secondary.main,
                                '&:hover': {backgroundColor: theme.palette.secondary.light},
                                color: "white",
                            }}>
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