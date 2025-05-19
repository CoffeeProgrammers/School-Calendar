import React from "react"
import {Box} from "@mui/material";
import UpdateUserDialog from "../update/UpdateUserDialog";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import TextUtils from "../../../../utils/TextUtils";
import Options from "../../../layouts/Options";
import UpdatePasswordDialog from "../password/UpdatePasswordDialog";
import CalendarContent from "../../event/calendar/CalendarContent";
import Cookies from "js-cookie";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateUtils from "../../../../utils/DateUtils";
import EmailIcon from "@mui/icons-material/Email";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CommentIcon from '@mui/icons-material/Comment';

const UserView =
    ({
         user,
         handleUpdate,
         handleUpdatePassword,
         visitedEventsCount,
         completedTasksCount,
         writtenCommentsCount
     }) => {
        const isMyUser = user.id.toString() === Cookies.get("userId");

        return (
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',}}>
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
                        <UserDataBox
                            user={user}
                            handleUpdate={handleUpdate}
                            handleUpdatePassword={handleUpdatePassword}
                            isMyUser={isMyUser}
                            visitedEventsCount={visitedEventsCount}
                            completedTasksCount={completedTasksCount}
                            writtenCommentsCount={writtenCommentsCount}
                        />
                        <Box sx={{
                            border: '1px solid #ddd',
                            padding: '10px',
                            borderRadius: "10px",
                        }}>
                            <CalendarContent userId={user.id}/>
                        </Box>
                    </Box>

                </Box>
            </Box>


        )
    }
export default UserView

const UserDataBox =
    ({
         user,
         handleUpdate,
         handleUpdatePassword,
         isMyUser,
         visitedEventsCount,
         completedTasksCount,
         writtenCommentsCount
     }) => {
        const isTeacher = Cookies.get("role") === "TEACHER";

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

        const statisticsList = [
            {
                icon: <SpaceDashboardIcon color="primary"/>,
                label: "Events visited:",
                value: visitedEventsCount.toString()
            },
            {
                icon: <AssignmentTurnedInIcon color="primary"/>,
                label: "Tasks completed:",
                value: `${completedTasksCount.countCompleted}/${completedTasksCount.countAll}`
            },
            {
                icon: <CommentIcon color="primary"/>,
                label: "Comments written:",
                value: writtenCommentsCount
            },
        ]

        return (
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
                    {(isTeacher || isMyUser) && (
                        <>
                            {isMyUser && (
                                <Box mt={1}>
                                    <UpdatePasswordDialog handleUpdatePassword={handleUpdatePassword}/>
                                </Box>)}
                            <Box mt={1}>
                                <UpdateUserDialog user={user} handleUpdate={handleUpdate}/>
                            </Box>
                        </>
                    )}

                    <Typography variant="h4">{TextUtils.getUserFullName(user)}</Typography>
                </Box>

                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{fontWeight: "bold", textAlign: 'center'}}>
                            About me:
                        </Typography>
                        <Options optionsList={optionList}/>
                    </Box>


                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography mt={2} sx={{fontWeight: "bold", textAlign: 'center'}}>
                            Statistics:
                        </Typography>
                        <Options optionsList={statisticsList} textAlign="center"/>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography mt={2} sx={{fontWeight: "bold", textAlign: 'center'}}>
                            Description:
                        </Typography>
                        <Typography mt={0.5}>{user.description}</Typography>
                    </Box>


                </Box>
            </Box>
        )
    }