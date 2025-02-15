import React, {useState, useEffect} from 'react';
import AppBar from "./appBar/AppBar";
import {Box, Container} from "@mui/material";

const Page = ({children}) => {
    return (
        <>
            <Box mb={"10px"}>
                <AppBar/>
            </Box>

            <Container>
                {children}
            </Container>

        </>
    );
};

export default Page;