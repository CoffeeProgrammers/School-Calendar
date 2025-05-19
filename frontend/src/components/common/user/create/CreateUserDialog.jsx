import React, {useState} from 'react';
import {Box, Container, Divider, IconButton, MenuItem, TextField} from "@mui/material";
import FullScreenFunctionDialog from "../../../layouts/full_screen_dialog/FullScreenFunctionDialog";
import FullScreenDialogAppBar from "../../../layouts/full_screen_dialog/FullScreenDialogAppBar";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import theme from "../../../../assets/theme";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";

const CreateUserDialog = ({handleCreate}) => {
    const [open, setOpen] = React.useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [birthday, setBirthday] = useState('');


    const clearFields = () => {
        setEmail('');
        setPassword('');
        setRole('');
        setFirstName('');
        setLastName('');
        setBirthday('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearFields()
    };

    const handleSave = () => {
        handleCreate({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role,
            birthday: birthday
        })
        setOpen(false);
        clearFields()
    }

    return (
        <>
            <IconButton sx={{
                borderRadius: 2,
                width: "37px",
                height: "37px"
            }} onClick={handleClickOpen}>
                <AddBoxIcon sx={{
                    fontSize: 35, color: 'secondary.main', borderRadius: 15,
                }}/>
            </IconButton>
            {/*<Button*/}
            {/*    onClick={handleClickOpen}*/}
            {/*    sx={{...defaultButtonStyles,}}*/}
            {/*>*/}
            {/*    New*/}
            {/*</Button>*/}

            <FullScreenFunctionDialog open={open} handleClose={handleClose}>
                <FullScreenDialogAppBar handleClose={handleClose} handleSave={handleSave}/>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        width: "725px",
                        display: 'flex',
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '10px',
                        borderRadius: "10px",
                        flexDirection: "column"
                    }}>
                        <Container maxWidth={"md"}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                                <AssignmentIcon fontSize="medium" color="secondary"/>
                                <Typography variant="h6">
                                    User Create
                                </Typography>
                            </Box>

                            <Divider sx={{mt: 1, mb: 1}}/>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                                <TextField
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    fullWidth
                                    select
                                >
                                    <MenuItem value="STUDENT">Student</MenuItem>
                                    <MenuItem value="TEACHER">Teacher</MenuItem>
                                    <MenuItem value="PARENT">Parent</MenuItem>
                                </TextField>
                                <DateTimePicker
                                    label="Birthday"
                                    views={['year', 'month', 'day']}
                                    defaultValue={birthday ? dayjs(birthday) : null}
                                    onChange={(newValue) => setBirthday(newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : null)}
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
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </FullScreenFunctionDialog>
        </>
    );
};

export default CreateUserDialog;