import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ReceivedInvitationsList from "./received/ReceivedInvitationsList";
import EmailIcon from '@mui/icons-material/Email';
import {Container, Divider} from "@mui/material";
import SentInvitationsList from "./sent/SentInvitationsList";

const InvitationsContainer = () => {
    const [tabValue, setTabValue] = React.useState('RECEIVED');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    function TabPanel(props) {
        const {children, value, index} = props

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        {children}
                    </Box>
                )}
            </div>
        )
    }

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }


    return (
        <Container maxWidth={"md"}>
            <Box sx={{padding: "10px", border: '1px solid #ddd', borderRadius: "10px"}}>
                <Box sx={{width: '100%'}}>
                    <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5, mt: 1, ml: 1}}>
                        <Box mt={0.5}>
                            <EmailIcon fontSize="medium" color="secondary"/>
                        </Box>
                        <Typography variant="h5">
                            Invitations
                        </Typography>
                    </Box>

                    <Divider sx={{mb: 0, mt: 0.5}}/>

                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab
                                value='RECEIVED'
                                label={
                                    <Typography fontWeight={tabValue === "RECEIVED" && "bold"}>
                                        Received
                                    </Typography>
                                }
                                sx={{textTransform: "none",}}
                            />
                            <Tab
                                value='SENT'
                                label={
                                    <Typography fontWeight={tabValue === "SENT" && "bold"}>
                                        Sent
                                    </Typography>
                                }
                                {...a11yProps(0)}
                                sx={{textTransform: "none",}}
                            />
                        </Tabs>
                    </Box>
                </Box>
                <TabPanel value={tabValue} index='RECEIVED'>
                    <ReceivedInvitationsList/>
                </TabPanel>
                <TabPanel value={tabValue} index='SENT'>
                    <SentInvitationsList/>
                </TabPanel>
            </Box>
        </Container>
    )
};

export default InvitationsContainer;