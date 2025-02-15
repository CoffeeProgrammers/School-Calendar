import AppBarButton from "./AppBarButton";
import {Box, Stack, Typography} from "@mui/material";

const AppBar = () => {
    const role = "TEACHER" //TODO

    const buttons = [
        {text: "Home", link: ""},
        {text: "Events", link: "/events"},
        {text: "Tasks", link: "/tasks"},
    ]

    if (role === "TEACHER") {
        buttons.push({text: "Teacher panel", link: "/admin"})
    }

    return (
        <>
            <Stack bgcolor={"#d5d5d5"} direction="row" alignItems={"center"}>
                <Typography variant="body1" color={"primary"}>
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