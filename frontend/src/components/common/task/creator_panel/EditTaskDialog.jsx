import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Edit} from "@mui/icons-material";
import {Box, Container, TextField} from "@mui/material";
import {defaultButtonStyles} from "../../../../assets/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTaskDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} color="secondary"
                        sx={{borderRadius: '5px', width: '30px', height: '30px'}}>
                <Edit/>
            </IconButton>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{
                    position: 'relative',
                    width: '100%',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#fff',
                    boxShadow: 'none',
                    zIndex: 1000
                }}>
                    <Toolbar sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <IconButton
                            edge="start"
                            color="primary"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>

                        <Typography color="primary" sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Task Update
                        </Typography>

                        <Button autoFocus sx={{...defaultButtonStyles, height: '40px'}} onClick={handleClose}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        width: "800px",
                        display: 'flex',
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '10px',
                        borderRadius: "10px",
                        flexDirection: "column"
                    }}>
                        <Container maxWidth="md">
                            <Container maxWidth="md">
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                    <TextField label="Name" fullWidth variant="outlined"/>
                                    <TextField label="Start date" fullWidth variant="outlined"
                                               type="datetime-local" InputLabelProps={{shrink: true}}/>
                                    <TextField label="End date" fullWidth variant="outlined"
                                               type="datetime-local" InputLabelProps={{shrink: true}}/>
                                    <TextField label="Content" fullWidth variant="outlined" multiline rows={4}/>
                                </Box>
                            </Container>
                        </Container>
                    </Box>
                </Box>

            </Dialog>
        </>
    );
};

export default EditTaskDialog;