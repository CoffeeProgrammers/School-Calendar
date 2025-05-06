import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import GenerationNotifications from '../../common/notifications/GenerationNotifications';
import GenerationInvitations from '../../common/notifications/GenerationInvitations';

const NotificationsPage = () => {
    const [value, setValue] = React.useState('notifications');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index } = props

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
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
        <Box sx={{ width: "60%", padding: "10px", border: '1px solid #ddd', borderRadius: "10px" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="full width tabs example"
            >
                <Tab value='notifications' label={<Typography>Notifications</Typography>} {...a11yProps(0)} sx={{ textTransform: "none" }} ></Tab>
                <Tab value='invitations' label={<Typography>Invitations</Typography>} sx={{ textTransform: "none" }} />
            </Tabs>
            <TabPanel value={value} index='notifications'>
                <GenerationNotifications />
            </TabPanel>
            <TabPanel value={value} index='invitations'>
                <GenerationInvitations />
            </TabPanel>
        </Box>
    )
}

export default NotificationsPage