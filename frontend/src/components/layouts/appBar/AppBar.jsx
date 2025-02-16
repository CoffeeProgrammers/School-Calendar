import AppBarButton from "./AppBarButton";
import { Stack, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../../../assets/css/style.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AppBar = () => {
    const role = "TEACHER" //TODO

    const buttons = [
        { text: "Home", link: "" },
        { text: "Events", link: "/events" },
        { text: "Tasks", link: "/tasks" },
        { text: "Users", link: "/users" },
    ]

    if (role === "TEACHER") {
        buttons.push({ text: "Teacher panel", link: "/admin" })
    }

    return (
        <>
            <Stack style={{ border: '1px solid #ddd', padding: '0 8px', height: "60px" }} direction="row" alignItems={"center"} position={'fixed'} top={0} display={"flex"} width={'100%'} justifyContent={"space-between"}>
                <div className="logo-nav" style={{ display: "flex", alignItems: 'center' }}>
                    <CalendarMonthIcon fontSize="large" sx={{ color: "#027a0a", marginRight: "9px" }} />
                    <Typography fontWeight="bold" variant="h6" mr={5}>
                        Calendar
                    </Typography>

                    {buttons.map((button, index) => (
                        <AppBarButton
                            key={index}
                            text={button.text}
                            link={button.link}
                        />
                    ))}
                </div>
                <div className="notification-avatar" style={{ display: "flex", alignItems: 'center', marginRight: '20px' }} >
                    <NotificationsIcon color="primary" style={{ marginRight: '10px' }} />
                    <div className="avatar" style={{ display: "flex", alignItems: 'center' }}>
                        <AccountCircleIcon fontSize="large" color="primary" />
                        <KeyboardArrowDownIcon color="primary" />
                    </div>
                </div>
            </Stack>
        </>
    );
};

export default AppBar;