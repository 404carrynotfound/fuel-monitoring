import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { login } from '../service/AuthService.ts';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await login(email, password);
        const json = await res.json();

        if (res.status === 401) {
            alert(json.message);
            return;
        }

        if (json?.token) {
            localStorage.setItem('token', json.token);
            navigate('/dashboard');
        }
    };

    return (
        <Box sx={ {
            marginLeft: '35%',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
        } }>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={ e => setEmail(e.target.value) }
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={ e => setPassword(e.target.value) }
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={ { mt: 3, mb: 2 } }
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            { 'Don\'t have an account? Sign Up' }
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Login;
