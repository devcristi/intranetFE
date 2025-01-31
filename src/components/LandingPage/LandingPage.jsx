import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box, Paper, Typography, Container } from '@mui/material';
const LandingPage = () => {

  return (
    <div className="wrapper">
      <Navbar />
      <Container maxWidth=" lg">
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }} >
          <Typography variant="h3" align="left" sx={{ mt: 10 }}>Salut!</Typography>
          <Typography variant="h4" align="left" sx={{ mt: 0 }}>Bine ai venit pe pagina de intranet Absoluto.</Typography>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;