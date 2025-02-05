import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Compatibilitate cu Toolpad
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Simulăm datele pentru grafice
const mockData = [
  { name: "Lun", value: 10 },
  { name: "Mar", value: 20 },
  { name: "Mie", value: 15 },
  { name: "Joi", value: 25 },
  { name: "Vin", value: 18 },
  { name: "Sam", value: 30 },
  { name: "Dum", value: 22 },
];

export default function DashboardStats() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [sportCenters, setSportCenters] = useState(0);
  const [weeklyTrainings, setWeeklyTrainings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch număr de utilizatori
    axios
      .get("http://localhost:8080/api/users/count")
      .then((response) => {
        setTotalUsers(response.data);
      })
      .catch((error) => {
        console.error("Eroare la preluarea numărului de utilizatori:", error);
      });

    // Fetch număr de centre
    axios
      .get("http://localhost:8080/api/centres/count")
      .then((response) => {
        setSportCenters(response.data);
      })
      .catch((error) => {
        console.error("Eroare la preluarea numărului de centre:", error);
      });

    // Fetch număr de antrenamente (aici poți adăuga apelul corespunzător)
    // axios.get("http://localhost:8080/api/trainings/count")
    //   .then(response => setWeeklyTrainings(response.data))
    //   .catch(error => console.error("Eroare la preluarea antrenamentelor:", error));
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex", // adăugăm display flex
        flexDirection: "column", // afișăm pe verticală
        alignItems: "center", // centrează pe orizontală
        justifyContent: "center", // centrează pe verticală
        px: 2,
        py: 4,
      }}
    >
      <h1>Panou de administrare</h1>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* 🔹 Card - Total Utilizatori */}
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              width: "100%",
              height: 220,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              px: 4,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
              boxShadow: 1,
            }}
            onClick={() => navigate("/admin/sportivi")}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Total Sportivi
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  {totalUsers}
                </Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 🔹 Card - Centre Absoluto */}
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              width: "100%",
              height: 220,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              px: 4,
              cursor: "pointer",
              boxShadow: 1,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={() => navigate("/admin/centre")}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Centre Absoluto
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  {sportCenters}
                </Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 🔹 Card - Antrenamente săptămâna aceasta (Mock) */}
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              width: "100%",
              height: 220,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              px: 4,
              boxShadow: 1,
              ":hover": { backgroundColor: "#f5f5f5" },
              cursor: "pointer",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Orar studenti
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  
                }}
                onClick={() => navigate("/admin/orar")}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  {weeklyTrainings}
                </Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#f44336" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}