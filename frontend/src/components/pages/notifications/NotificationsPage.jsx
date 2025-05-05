import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NotificationsPage = () => {
    return (
        <Box sx={{ width: "50%", border: "1px solid black", padding: "10px" }}>
            <Tabs
                sx={{ textColor: "#333" }}
                textColor="#333"
                indicatorColor="secondary">
                <Tab value='notification' label="Notification" />
                <Tab value='invitations' label="Invitations" />
            </Tabs>
        </Box>
    )
}

export default NotificationsPage