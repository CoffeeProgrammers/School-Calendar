import React from 'react';
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Options from "../../layouts/Options";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import UpdateUserDialog from "./creator_panel/UpdateUserDialog";
import TextUtils from "../../../utils/TextUtils";

const mainBoxStyles = {
    border: '1px solid #ddd',
    padding: '20px 20px 8px 20px',
    margin: '10px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
};

const UserPageMainBox = ({user}) => {

    const optionList = [
        {
            icon: <CalendarMonthIcon color="primary"/>,
            label: "Birthday:",
            // TODO formatDate
            value: user.birthday.split("T")[0].replace(/-/g, ".")
        },
        {
            icon: <EmailIcon color="primary"/>,
            label: "Email:",
            value: user.email
        },
        {
            icon: <PersonIcon color="primary"/>,
            label: "Role:",
            value: TextUtils.formatEnumText(user.role)
        },
    ]

    return (
        <Box sx={mainBoxStyles}>
            <Box className="profile-container">
                <Box className="profile-information">
                    <Box sx={{position: 'absolute', top: 100, left: 50}}>
                        <UpdateUserDialog user={user}/>
                    </Box>
                    <Box className="user-photo" border={3} borderColor={'#347928'}>
                        <PersonIcon className="user-photo-icon" color="primary" sx={{fontSize: 210}}/>
                    </Box>

                    <Box className="user-name">
                        <Typography variant="h4" mb={2}>{TextUtils.getUserFullName(user)}</Typography>
                    </Box>

                    <Box>
                        <Options optionsList={optionList}/>

                        <Box className="user-description">
                            <Typography variant="p" mt={2} sx={{fontWeight: "bold", textAlign: 'center'}}>
                                Description:
                            </Typography>
                            <Typography variant="p" mt={0.5}>{user.description}</Typography>
                        </Box>

                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default UserPageMainBox;