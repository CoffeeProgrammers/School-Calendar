import AppBarButton from "./buttons/AppBarButton";
import {Stack, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NotificationsButton from "./buttons/NotificationsButton";
import AccountMenu from "./buttons/AccountMenu";
import InvitationsButton from "./buttons/InvitationsButton";

const appBarStyles = {
    width: '100%',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    boxShadow: 'none',
    zIndex: 1000
};

const appToolbar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}

const toolbarIconsContainer = {
    display: "flex",
    alignItems: "center",
};



const calendarTypographyStyles = {
    mr: "40px",
    ml: "5px",
    color: "black",
};



const AppBar = () => {
    const role = "TEACHER" //TODO

    const buttons = [
        {text: "Home", link: "/"},
        {text: "Events", link: "/events"},
        {text: "Tasks", link: "/tasks"},
        {text: "Users", link: "/users"},
    ]

    if (role === "TEACHER") {
        buttons.push({text: "Teacher panel", link: "/admin"})
    }

    return (
        <MuiAppBar position="absolute" sx={appBarStyles}>
            <Toolbar sx={appToolbar}>

                <Stack direction="row" alignItems={"center"}>
                    <CalendarMonthIcon fontSize="large" color="secondary"/>
                    <Typography fontWeight="bold" variant="h6" sx={calendarTypographyStyles}>
                        Calendar
                    </Typography>

                    {buttons.map((button, index) => (
                        <AppBarButton
                            key={index}
                            text={button.text}
                            link={button.link}
                        />
                    ))}
                </Stack>

                <Box sx={toolbarIconsContainer}>
                    <NotificationsButton/>
                    <InvitationsButton/>
                    <AccountMenu/>
                </Box>

            </Toolbar>
        </MuiAppBar>
    );
}

export default AppBar;

