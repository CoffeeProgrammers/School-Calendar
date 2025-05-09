import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import theme from './assets/theme';

import Main from './components/pages/main/Main';
import Page from './components/layouts/Page';
import Users from './components/pages/user/Users';
import Tasks from './components/pages/task/Tasks';
import EventPage from './components/pages/event/EventPage';
import Login from './components/pages/login/Login';
import Events from './components/pages/event/Events';
import UserPage from './components/pages/user/UserPage';
import MyProfile from './components/pages/user/MyProfile';
import NotificationsPage from './components/pages/notifications/NotificationsPage';
import TaskPage from './components/pages/task/TaskPage';
import Login from "./security/login/Login";
import Page from "./components/layouts/Page";
import {ThemeProvider} from "@mui/material";
import theme from "./assets/theme"
import Tasks from "./components/pages/task/Tasks";
import Event from "./components/pages/event/Event";
import PrivateRoute from "./security/PrivateRoute";
import Events from "./components/pages/event/Events";
import UserPage from "./components/pages/user/UserPage";
import MyProfile from "./components/pages/user/MyProfile";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path={""} element={<Page><Main/></Page>}/>
                            <Route path={"/events"} element={<Page><Events/></Page>}/>
                            <Route path={"/users"} element={<Page><Users/></Page>}/>
                            <Route path={"/tasks"} element={<Page><Tasks/></Page>}/>
                            <Route path={"/events/:id"} element={<Page><Event/></Page>}/>
                            <Route path={'/profile'} element={<Page><MyProfile/></Page>} />
                            <Route path={"/users/:id"} element={<Page><UserPage/></Page>}/>
                            <Route path="/tasks/:id" element={<TaskPage/>}/>
                            <Route path="/notifications" element={<Page><NotificationsPage/></Page>}/>
                        </Route>
                    </Routes>
                </LocalizationProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
