import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {ThemeProvider, Typography} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import theme from './assets/theme';

import MainPage from './components/pages/main/MainPage';
import Page from './components/layouts/Page';
import Users from './components/pages/user/Users';
import Tasks from './components/pages/task/Tasks';
import Events from './components/pages/event/Events';
import UserPage from './components/pages/user/UserPage';
import ProfilePage from './components/pages/user/ProfilePage';
import NotificationsPage from './components/pages/notifications/NotificationsPage';
import TaskPage from './components/pages/task/TaskPage';
import EventPage from "./components/pages/event/EventPage";
import Login from "./security/login/Login";
import InvitationsPage from "./components/pages/invitations/InvitationsPage";
import TeacherPanelPage from "./components/pages/teacher_panel/TeacherPanelPage";
import {history} from "./utils/history";
import {useEffect} from "react";

import './index.css';
import PrivateRoute from "./security/PrivateRoute";
import {ErrorProvider} from "./contexts/ErrorContext";
import Cookies from "js-cookie";

const InitNavigation = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        history.navigate = navigate;
    }, [navigate]);

    return children;
};

function App() {

    const role = Cookies.get('role');

    const routes = [
        {path: "", element: <MainPage/>},
        {path: "/events", element: <Page><Events/></Page>},
        {path: "/users", element: <Page><Users/></Page>},
        {path: "/tasks", element: <Page><Tasks/></Page>},
        {path: "/events/:id", element: <Page><EventPage/></Page>},
        {path: "/profile", element: <ProfilePage/>},
        {path: "/users/:id", element: <Page><UserPage/></Page>},
        {path: "/tasks/:id", element: <TaskPage/>},
        {path: "/notifications", element: <Page><NotificationsPage/></Page>},
        {path: "/invitations", element: <InvitationsPage/>},
        {path: "*", element: <Typography p={"50px"} variant={"h4"} color={'error'}>404 page found </Typography>},
        role === 'TEACHER' && {path: "/teacherPanel", element: <TeacherPanelPage/>}

    ];

    return (
        <BrowserRouter>
            <InitNavigation>
                <ErrorProvider>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                {routes.map((route, index) => (
                                    <Route element={<PrivateRoute/>} key={index}>
                                        <Route
                                            path={route.path}
                                            element={route.element}
                                        />
                                    </Route>
                                ))}
                            </Routes>
                        </LocalizationProvider>
                    </ThemeProvider>
                </ErrorProvider>
            </InitNavigation>
        </BrowserRouter>
    );
}

export default App;
