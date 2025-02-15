import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={""} element={<Main/>}/>
          <Route path={"/login"} element={<Login/>}/>
        </Routes>
      </Router>
  );
}

export default App;
