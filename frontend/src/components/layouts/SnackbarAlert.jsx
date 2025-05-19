import React from 'react';
import {Alert, Snackbar} from '@mui/material';

const SnackbarAlert = ({ message, onClose }) => {
    return (
        <Snackbar open={true} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;