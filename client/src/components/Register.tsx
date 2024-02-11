import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { register } from '../service/AuthService.ts';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        const res = await register(username, password);
        const json = await res.json();

        if (res.status === 400) {
            alert(json.message);
            return;
        }

        navigate('/dashboard');
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
                Sign up
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
                    onChange={ event => setUsername(event.target.value) }
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
                    onChange={ event => setPassword(event.target.value) }
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="re-password"
                    label="Re-password"
                    type="password"
                    id="re-password"
                    autoComplete="re-current-password"
                    onChange={ event => setRepeatPassword(event.target.value) }
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={ { mt: 3, mb: 2 } }
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
}

export default Register;
