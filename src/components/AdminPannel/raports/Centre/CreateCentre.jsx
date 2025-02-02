import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Paper } from "@mui/material";
import axios from "axios";

const CreateCentre = ({ onCentreCreated }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/centres",
        { name, location },
        { withCredentials: true }
      );
      setSuccess("Centru creat cu succes!");
      // Dacă s-a creat centrul cu succes, apelează callback-ul pentru reîmprospătarea listei
      if (onCentreCreated) {
        onCentreCreated(response.data);
      }
      // Resetare câmpuri
      setName("");
      setLocation("");
    } catch (err) {
      console.error(err);
      setError("Eroare la crearea centrului.");
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Creare Centru
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nume Centru"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Locație"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Creează Centru
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </form>
    </Paper>
  );
};

export default CreateCentre;
