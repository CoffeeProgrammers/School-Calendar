import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Page from "./components/layouts/Page";
import {ThemeProvider} from "@mui/material";
import theme from "./assets/theme"
import Events from "./components/pages/event/Events";
import Users from "./components/pages/user/Users";
import Tasks from "./components/pages/task/Tasks";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Page>
                    <Routes>
                        <Route path={""} element={<Main/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/events"} element={<Events/>}/>
                        <Route path={"/users"} element={<Users/>}/>
                        <Route path={"/tasks"} element={<Tasks/>}/>
                    </Routes>
                </Page>
            </ThemeProvider>
        </Router>
    );
}

export default App;
