import React, {useState} from 'react';
import UserListBox from "../list/UserListBox";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../../assets/styles";
import Dialog from "@mui/material/Dialog";

const InviteUserBox = ({user, handleInvite}) => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("");

    const handleSubmit = () => {
        handleInvite(user, text);
        setOpen(false);
        setText("")
    }

    const handleClose = () => {
        setOpen(false);
        setText("");

    }

    return (
        <>
            <Box onClick={() => setOpen(true)}>
                <UserListBox user={user}/>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color="primary">
                    {"Create an invite"}
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

export default InviteUserBox;