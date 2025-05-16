import React from "react"
import {Box} from "@mui/material";
import UpdateUserDialog from "../update/UpdateUserDialog";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import TextUtils from "../../../../utils/TextUtils";
import Options from "../../../layouts/Options";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import Cookies from "js-cookie";
import DateUtils from "../../../../utils/DateUtils";
import UpdatePasswordDialog from "../password/UpdatePasswordDialog";

const UserView = ({user, handleUpdate, handleUpdatePassword}) => {
    const isMyUser = user.id.toString() === Cookies.get("userId");
    const optionList = [
        {
            icon: <CalendarMonthIcon color="primary"/>,
            label: "Birthday:",
            value: DateUtils.formatBirthdayDate(user.birthday)
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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Box sx={{
                width: '100%',
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 2.5fr'}}>
                    <Box sx={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{
                            height: 210,
                            width: 210,
                            padding: 0,
                            marginBottom: "10px",
                            borderRadius: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: 3,
                            borderColor: 'secondary.main'
                        }}>
                            <PersonIcon color="primary" sx={{fontSize: 210, padding: 0, margin: 0}}/>
                        </Box>

                        <Box mb={2} sx={{display: 'flex', alignItems: 'center',}}>
                            {isMyUser && (
                                <>
                                    <Box mt={1}>
                                        <UpdatePasswordDialog handleUpdatePassword={handleUpdatePassword}/>
                                    </Box>
                                    <Box mt={1}>
                                        <UpdateUserDialog user={user} handleUpdate={handleUpdate}/>
                                    </Box>
                                </>
                            )}

                            <Typography variant="h4">{TextUtils.getUserFullName(user)}</Typography>
                        </Box>

                        <Box>
                            <Options optionsList={optionList}/>

                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography mt={2} sx={{fontWeight: "bold", textAlign: 'center'}}>
                                    Description:
                                </Typography>
                                <Typography mt={0.5}>{user.description}</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>


    )
}

export default UserView