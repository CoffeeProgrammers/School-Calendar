import React, {useState} from 'react';
import theme from "../../../assets/theme";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {red} from "@mui/material/colors";

const CreateCommentDialog = ({handleCreate}) => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");

    const handleSubmit = () => {
        handleCreate(text);
        setOpen(false);
        setText("")
    }

    const handleClose = () => {
        setOpen(false);
        setText("");

    }



    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" sx={{
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {backgroundColor: theme.palette.secondary.light},
                color: "white",
            }}>
                Create
            </Button>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color="primary">
                    {"Create"}
                </DialogTitle>

                <Box mt={-3}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            variant="filled"
                            multiline
                            maxRows={5}
                            label={"Enter a text"}
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
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
                            <Button onClick={handleSubmit} variant="contained" sx={{
                                backgroundColor: theme.palette.secondary.main,
                                '&:hover': {backgroundColor: theme.palette.secondary.light},
                                color: "white",
                            }}>
                                Create
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};


export default CreateCommentDialog;