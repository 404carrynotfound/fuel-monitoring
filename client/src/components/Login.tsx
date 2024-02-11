import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <Box sx={{
            marginLeft: '35%',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
        }}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
    )
        ;
}

export default Login;
