import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/pages/main/Main";
import Page from "./components/layouts/Page";
import {ThemeProvider} from "@mui/material";
import theme from "./assets/theme"
import Users from "./components/pages/user/Users";
import Tasks from "./components/pages/task/Tasks";
import Event from "./components/pages/event/Event";
import Login from "./components/pages/login/Login";
import Events from "./components/pages/event/Events";
import UserPage from "./components/pages/user/UserPage";
import MyProfile from "./components/pages/user/MyProfile";
import NotificationsPage from './components/pages/notifications/NotificationsPage';
import TaskPage from "./components/pages/task/TaskPage";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path={""} element={<Page><Main/></Page>}/>
                    <Route path={"/login"} element={<Page><Login/></Page>}/>
                    <Route path={"/events"} element={<Page><Events/></Page>}/>
                    <Route path={"/users"} element={<Page><Users/></Page>}/>
                    <Route path={"/tasks"} element={<Page><Tasks/></Page>}/>
                    <Route path={"/events/:id"} element={<Page><Event/></Page>}/>
                    <Route path={'/profile'} element={<Page><MyProfile/></Page>}/>
                    <Route path={"/users/:id"} element={<Page><UserPage/></Page>}/>
                    <Route path={"/tasks/:id"} element={<TaskPage/>}/>
                    <Route path={"/users/:id"} element={<Page><NotificationsPage/></Page>}/>
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
