import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {defaultButtonStyles} from "../../../assets/styles";
import AppBar from "@mui/material/AppBar";

const UpdateAppBar = ({handleClose, handleSave}) => {
    return (
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

                <Button autoFocus sx={{...defaultButtonStyles, height: '40px'}} onClick={handleSave}>
                    Save
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default UpdateAppBar;