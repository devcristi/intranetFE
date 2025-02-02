import React, { useState } from 'react';
import axios from 'axios';
import { Box, Link, TextField, Button, Container, Typography, Paper, Divider, Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import logo from '../../imgs/logobjj.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../components/AuthContext/AuthContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const loginResponse = await axios.post(
            'http://localhost:8080/login',
            new URLSearchParams({
              email: email,
              password: password
            }),
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              withCredentials: true
            }
          );
          console.log("Răspuns login:", loginResponse.data);
      
          if (loginResponse.status === 200 && loginResponse.data.redirectUrl) {
            // Efectuează un apel suplimentar pentru a obține informațiile complete ale userului
            const userResponse = await axios.get("http://localhost:8080/api/users/info", {
              withCredentials: true
            });
            console.log("User info:", userResponse.data);
            
            // Actualizează contextul cu datele complete ale userului
            login(userResponse.data);
            
            console.log("Navigating to:", loginResponse.data.redirectUrl);
            navigate("/admin");
          } else {
            setError("Autentificare eșuată!");
          }
        } catch (err) {
          console.error("Eroare la login:", err.response?.data || err.message);
          setError("Autentificare eșuată!");
        }
      };
      
    
    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: '2rem' }}>
                        <motion.div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        maxWidth: '150px',
                                        height: 'auto',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                        </motion.div>
                        <Typography variant="h4" align="left" gutterBottom style={{ marginTop: '1rem' }}>
                            Sign in
                        </Typography>
                        <form onSubmit={handleLogin}>
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
                                label="Parola"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Remember me"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginTop: '1rem',
                                }}
                            />
                            <Box display="flex" justifyContent="space-evenly" alignItems="center" width="100%">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Autentificare
                                </Button>
                                <Button
                                    variant="plain"
                                    color="primary"
                                    style={{
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <Link href="#" underline="none" color="primary">
                                        Ai uitat parola?
                                    </Link>
                                </Button>
                            </Box>
                            <Divider>Nu ai un cont?</Divider>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '1rem' }}
                                component={RouterLink}
                                to="/signup"
                            >
                                Inregistrare
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
