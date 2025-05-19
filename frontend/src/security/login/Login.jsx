import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthService from "../../services/auth/AuthService";
import './../../assets/css/login.css'
import {useError} from "../../contexts/ErrorContext";

const Login = () => {
    const {showError} = useError()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessages, setErrorMessages] = useState([]);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessages([])
        try {
            await AuthService.login(email, password);
            navigate("/");
        } catch (error) {
            showError(error);
        }

    };

    return (
        <Box className="login-container">
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h5" sx={{
                    fontSize: '24px',
                    marginBottom: '20px',
                    color: '#333'
                }}
                >
                    Login
                </Typography>
            </Box>
            <form onSubmit={handleLogin}>
                <input
                    required
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />
                {errorMessages.length > 0 && (
                    <Box mt={2}>
                        {errorMessages.map((message, index) => (
                            <Typography key={index} color="error">{message}</Typography>
                        ))}
                    </Box>
                )}
                <button autoFocus type="submit">Login</button>
            </form>
        </Box>
    );
};

export default Login;
