import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container } from '@mui/material';

const Test = () => {
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/test') // URL-ul endpoint-ului din backend
            .then(response => {
                setResponseMessage(response.data); // Stochează răspunsul în state
            })
            .catch(error => {
                setResponseMessage('Eroare la conectare la backend');
                console.error('Axios error:', error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                {responseMessage ? responseMessage : 'Se încarcă mesajul...'}
            </Typography>
        </Container>
    );
};

export default Test;
