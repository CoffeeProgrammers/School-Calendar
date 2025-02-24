import AppBar from "./appBar/AppBar";
import {Box, Container} from "@mui/material";

const Page = ({children}) => {
    return (
        <>
            <Box mb={"70px"}>
                <AppBar/>
            </Box>

            <Container maxWidth={"xl"}>
                {children}
            </Container>

        </>
    );
};

export default Page;