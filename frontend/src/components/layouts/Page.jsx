import AppBar from "./appBar/AppBar";
import {Box, Container} from "@mui/material";

const Page = ({children}) => {
    return (
        <>
            <Box mb={"80px"}>
                <AppBar/>
            </Box>
            <Container maxWidth={"xl"} sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                {children}
            </Container>

        </>
    );
};

export default Page;