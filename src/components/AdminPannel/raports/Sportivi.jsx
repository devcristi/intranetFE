import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";

const Sportivi = () => {
  const [sportivi, setSportivi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la preluarea datelor.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data received:", data);
        // Filtrare: păstrează doar elementele care sunt obiecte și au o proprietate id
        const validUsers = data.filter(user => typeof user === 'object' && user.id != null);
        
        const formattedData = validUsers.map((user) => ({
          ...user,
          id: user.id, // asigură-te că fiecare user are un id unic
          role: user.roles ? user.roles.join(", ") : "",
          centre:
            user.centres && user.centres.length > 0
              ? user.centres.map((c) => c.name).join(", ")
              : ""
        }));
        setSportivi(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 180 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 100 },
    { field: "centre", headerName: "Centre", flex: 1, minWidth: 150 }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: isMobile ? "100%" : "90%",
          mx: "auto",
          padding: 2,
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Sportivi
        </Typography>

        {isMobile ? (
          // Pe mobil: listă de carduri
          <Box sx={{ width: "100%" }}>
            {sportivi.map((sportiv) => (
              <Card key={sportiv.id} sx={{ mb: 2, padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {sportiv.firstName} {sportiv.lastName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>ID:</strong> {sportiv.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {sportiv.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Role:</strong> {sportiv.role}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Centre:</strong> {sportiv.centre}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          // Pe desktop: tabelul DataGrid
          <Box sx={{ height: 500, width: "100%", minWidth: 800 }}>
            <DataGrid
              rows={sportivi}
              columns={columns}
              pageSize={5}
              autoHeight
            />
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default Sportivi;
