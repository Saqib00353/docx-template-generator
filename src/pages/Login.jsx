/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Input,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('example@gmail.com');
    const [password, setPassword] = useState('123');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {

        if (email === 'example@gmail.com' && password === '123') {
            localStorage.setItem('user', JSON.stringify({ email }));
            navigate("/");
        } else {
            // show error message if user does not exist
            alert('Invalid email or password');
        }
    };

    return (
        <Box sx={{ maxWidth: 300, display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexDirection: "column", height: "100vh" , margin:'auto' }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Login
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
}

export default Login;