import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Link, TextField, Button, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import logo from '../../imgs/logobjj.png';
import { Link as RouterLink } from 'react-router-dom';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // Pentru a gestiona starea de încărcare
    const [error, setError] = useState(''); // Pentru a afișa mesaje de eroare

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/test', {
                    headers: {
                        Authorization: `Bearer 0ba9dd87-d962-428a-8c07-e912131cf9fa`,
                    },
                });
                console.log('Data fetched:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Functia pentru gestionarea inregistrarii
    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert("Parolele nu se potrivesc!");
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', 
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Specifică tipul conținutului
                    },
                }
            );
            alert('Inregistrare reusita!');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError('Network error. Please try again later.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: '2rem' }}>
                        <motion.div>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={logo} alt="Logo" style={{ maxWidth: '150px', height: 'auto', objectFit: 'cover' }} />
                            </Box>
                        </motion.div>
                        <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '1rem' }}>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSignUp}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                margin="normal"
                            />
                            {error && (
                                <Typography color="error" variant="body2" align="center" style={{ marginTop: '1rem' }}>
                                    {error}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                                type="submit"
                                disabled={loading} // Dezactivează butonul pe durata încărcării
                            >
                                {loading ? 'Creare cont...' : 'Creeaza cont'}
                            </Button>
                            <Typography variant="body2" align="center" gutterBottom>
                                Ai deja un cont?{' '}
                                <Link component={RouterLink} to="/" variant="body2" style={{ textDecoration: 'none' }}>
                                    Login
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUp;