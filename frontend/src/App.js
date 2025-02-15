import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Page from "./components/layouts/Page";
import {ThemeProvider} from "@mui/material";
import theme from "./assets/theme"

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Page>
                    <Routes>
                        <Route path={""} element={<Main/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Page>
            </ThemeProvider>
        </Router>
    );
}

export default App;
