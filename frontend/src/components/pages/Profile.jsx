import React from "react"
import "../../assets/css/profile.css"
import PersonIcon from '@mui/icons-material/Person';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';

const mainBoxStyles = {
    minHeight: "525px", // todo: 3 lines height
    border: '1px solid #ddd',
    padding: '20px 20px 8px 20px',
    margin: '10px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
};

const Profile = () => {
    return (
        <Box sx={mainBoxStyles}>
            <Box className="profile-container">
                <Box className="profile-information">
                    <Box className="user-photo" border={2} borderColor={'#347928'}>
                        <PersonIcon className="user-photo-icon" sx={{ fontSize: 250 }} />
                    </Box>
                    <Box className="user-name">
                        <Typography variant="h4" mb={2}>Sophia Miller</Typography>
                    </Box>
                    <Box>
                        <table className="user-information">
                            <tr>
                                <td>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarMonthIcon color="primary" />
                                        <Typography variant="p" ml={0.5}>birthday:</Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Typography variant="p">14.06.2011</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <EmailIcon color="primary" />
                                        <Typography variant="p" ml={0.5}>email:</Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Typography variant="p">user00001@gmail.com</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PersonIcon color="primary" />
                                        <Typography variant="p" ml={0.5}>role:</Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Typography variant="p">student</Typography>
                                </td>
                            </tr>
                        </table>
                        <Box className="user-description">
                            <Typography variant="p" mt={2} sx={{ fontWeight: "bold", textAlign: 'center' }}>Description:</Typography>
                            <Typography variant="p" mt={2}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit enim quibusdam similique, molestiae cupiditate eius dolores repudiandae, voluptatem dolor culpa blanditiis ab obcaecati porro architecto dignissimos sunt placeat alias atque?</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box></Box>
            </Box>
        </Box >

    )
}

export default Profile