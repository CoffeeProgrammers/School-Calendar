import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Edit} from "@mui/icons-material";
import {Box, Container, Divider, TextField} from "@mui/material";
import {defaultButtonStyles} from "../../../../assets/styles";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import theme from "../../../../assets/theme";
import dayjs from "dayjs";
import AssignmentIcon from "@mui/icons-material/Assignment";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTaskDialog = ({task}) => {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);
    const [content, setContent] = useState(task.content);

    //TODO: handleSave

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

                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <CalendarMonthIcon fontSize="large" color="secondary"/>
                            <Typography fontWeight="bold" variant="h6" sx={{
                                ml: "5px",
                                color: "black",
                            }}>
                                Calendar
                            </Typography>
                        </Box>


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
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                                    <AssignmentIcon fontSize="medium" color="secondary"/>                                    <Typography variant="h6">
                                        Task Update
                                    </Typography>
                                </Box>

                                <Divider sx={{mt: 1, mb: 1}}/>

                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>

                                    <TextField
                                        multiline
                                        label="Name"
                                        fullWidth
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <DateTimePicker
                                        label="Deadline"
                                        views={['month', 'day', 'hours', 'minutes']}
                                        ampm={false}
                                        defaultValue={deadline ? dayjs(deadline) : null}
                                        onChange={(newValue) => setDeadline(newValue)}
                                        slotProps={{
                                            textField: {
                                                sx: {
                                                    '& .MuiInputAdornment-root .MuiIconButton-root': {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    '& .MuiInputAdornment-root .MuiIconButton-root:hover': {
                                                        color: theme.palette.secondary.light,
                                                    },
                                                },
                                            }
                                        }}
                                    />
                                    <TextField
                                        label="Content"
                                        fullWidth
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
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