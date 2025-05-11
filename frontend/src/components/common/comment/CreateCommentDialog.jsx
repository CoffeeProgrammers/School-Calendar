import React, {useState} from 'react';
import theme from "../../../assets/theme";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../assets/styles";

const CreateCommentDialog = ({handleCreate}) => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");

    const handleSubmit = () => {
        handleCreate({text: text});
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
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color="primary">
                    {"Create a comment"}
                </DialogTitle>

                <Box mt={-3}>
                    <DialogContent>
                        <TextField
                            label={"Enter a text"}
                            value={text}
                            fullWidth
                            variant="filled"
                            multiline
                            maxRows={5}
                            onChange={(event) => {
                                setText(event.target.value);
                            }}
                        />
                    </DialogContent>

                    <Box mt={-2}>
                        <DialogActions>
                            <Button variant="contained" sx={disagreeButtonStyles} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={defaultButtonStyles} onClick={handleSubmit}>
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