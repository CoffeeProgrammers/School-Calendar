import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/pages/Main";
import Login from "./security/login/Login";
import Page from "./components/layouts/Page";
import {ThemeProvider} from "@mui/material";
import theme from "./assets/theme"
import Users from "./components/pages/user/Users";
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
                    </Route>
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
