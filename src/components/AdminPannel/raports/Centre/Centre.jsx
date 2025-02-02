import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import CreateCentre from "./CreateCentre"; // asigură-te că calea este corectă

const Centre = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pentru detaliile dialogului
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchCentres = () => {
    fetch("http://localhost:8080/api/centres", { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la preluarea datelor.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Centre data received:", data);
        const validCentres = data.filter((centre) => centre && centre.id != null);
        setCentres(validCentres);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  // Definirea coloanelor pentru DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "name", headerName: "Nume Centru", flex: 1, minWidth: 150 },
    { field: "location", headerName: "Locație", flex: 1, minWidth: 150 },
    { 
      field: "userCount", 
      headerName: "Nr. Useri", 
      flex: 0.5, 
      minWidth: 80, 
      valueGetter: (params) => (params?.row?.assignedUsers ? params.row.assignedUsers.length : 0)
    }
  ];

  // Când se face clic pe un rând, deschide dialogul cu detaliile centrului
  const handleRowClick = (params) => {
    setSelectedCentre(params.row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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

  if (isMobile) {
    return (
      <PageContainer>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Centre
          </Typography>
          {/* Formularul de creare centru */}
          <CreateCentre onCentreCreated={() => fetchCentres()} />
          {centres.map((centre) => (
            <Box key={centre.id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }} onClick={() => handleRowClick({ row: centre })}>
              <Typography variant="h6">
                {centre.name} (ID: {centre.id})
              </Typography>
              <Typography variant="body1">
                <strong>Locație:</strong> {centre.location}
              </Typography>
              <Typography variant="body1">
                <strong>Nr. Useri:</strong> {centre.assignedUsers ? centre.assignedUsers.length : 0}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Dialogul pentru detalii */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>Detalii Centru</DialogTitle>
          <DialogContent>
            {selectedCentre && (
              <Box>
                <Typography variant="h6">{selectedCentre.name}</Typography>
                <Typography variant="subtitle1">
                  Locație: {selectedCentre.location}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Utilizatori asociați:
                </Typography>
                {selectedCentre.assignedUsers && selectedCentre.assignedUsers.length > 0 ? (
                  <List>
                    {selectedCentre.assignedUsers.map((user) => (
                      <ListItem key={user.id}>
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={`Roluri: ${user.roles ? user.roles.join(", ") : "Niciun rol"}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2">Niciun utilizator</Typography>
                )}
                <Button onClick={handleCloseDialog} variant="contained" sx={{ mt: 2 }}>
                  Închide
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </PageContainer>
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
          maxWidth: "90%",
          mx: "auto",
          p: 2,
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Centre
        </Typography>
        <Divider sx={{ width: "100%", mb: 2 }} />
        {/* Formularul de creare centru */}
        <CreateCentre onCentreCreated={() => fetchCentres()} />
        <Box sx={{ height: 500, width: "100%", minWidth: 800 }}>
          <DataGrid
            rows={centres}
            columns={columns}
            pageSize={5}
            autoHeight
            onRowClick={handleRowClick}
            getRowId={(row, index) => row.id || index}
          />
        </Box>

        {/* Dialog pentru detaliile centrului */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>Detalii Centru</DialogTitle>
          <DialogContent>
            {selectedCentre && (
              <Box>
                <Typography variant="h6">{selectedCentre.name}</Typography>
                <Typography variant="subtitle1">
                  Locație: {selectedCentre.location}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Utilizatori asociați:
                </Typography>
                {selectedCentre.assignedUsers && selectedCentre.assignedUsers.length > 0 ? (
                  <List>
                    {selectedCentre.assignedUsers.map((user) => (
                      <ListItem key={user.id}>
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={`Roluri: ${user.roles ? user.roles.join(", ") : "Niciun rol"}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2">Niciun utilizator</Typography>
                )}
                <Button onClick={handleCloseDialog} variant="contained" sx={{ mt: 2 }}>
                  Închide
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default Centre;