import AppBarButton from "./AppBarButton";
import {Stack, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AppBar = () => {
    const role = "TEACHER" //TODO

    const buttons = [
        {text: "Home", link: ""},
        {text: "Events", link: "/events"},
        {text: "Tasks", link: "/tasks"},
        {text: "Users", link: "/users"},
    ]

    if (role === "TEACHER") {
        buttons.push({text: "Teacher panel", link: "/admin"})
    }

    return (
        <>
            <Stack style={{border: '1px solid #ddd', padding: '20px', margin: '10px'}} direction="row" alignItems={"center"}>
                <CalendarMonthIcon fontSize="large" sx={{marginRight: "9px"}}/>
                <Typography variant="h6" color={"primary"} mr={5}>
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
        </>
    );
};

export default AppBar;