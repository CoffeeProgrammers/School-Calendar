import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {IconButton} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../../services/auth/AuthService";

export default function AccountMenu() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate('/login')
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    };

    

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleToggle}>
                <AccountCircleIcon fontSize="large" color="primary"/>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: 'right top',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                >
                                    <MenuItem component={Link} to={"/profile"}
                                              onClick={handleClose}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
