import React from 'react';
import {Box, Container, Divider, TextField, Typography} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

const UpdatePasswordBox = (
    {
        newPassword,
        confirmNewPassword,
        password,
        setNewPassword,
        setConfirmNewPassword,
        setPassword
    }) => {
    return (
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
                        <LockIcon fontSize="medium" color="secondary"/>
                        <Typography variant="h6">
                            Password Update
                        </Typography>
                    </Box>

                    <Divider sx={{mt: 1, mb: 1}}/>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                        <TextField
                            type='password'
                            label="Password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            type='password'
                            label="New password"
                            fullWidth
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <TextField
                            type='password'
                            label="Confirm New Password"
                            fullWidth
                            variant="outlined"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />

                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default UpdatePasswordBox;