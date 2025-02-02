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
  Button
} from "@mui/material";

const CentresList = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/centres", { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la preluarea datelor.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Centre data received:", data);
        // Filtrăm doar obiectele care au un id valid (evităm rândurile incomplete)
        const validCentres = data.filter((centre) => centre && centre.id != null);
        setCentres(validCentres);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Definirea coloanelor pentru DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "name", headerName: "Nume Centru", flex: 1, minWidth: 150 },
    { field: "location", headerName: "Locație", flex: 1, minWidth: 150 }
  ];

  // Când se face clic pe un rând, actualizează selectedCentre și deschide dialogul
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

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Centre
      </Typography>
      <Box sx={{ height: 500, width: "100%", minWidth: 800 }}>
        <DataGrid
          rows={centres}
          columns={columns}
          pageSize={5}
          autoHeight
          onRowClick={handleRowClick}
          // Dacă vreun obiect nu are proprietatea `id`, folosește indexul ca fallback:
          getRowId={(row, index) => row.id || index}
        />
      </Box>

      {/* Dialog pentru afișarea detaliilor centrului */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Detalii Centru</DialogTitle>
        <DialogContent>
          {selectedCentre && (
            <Box>
              <Typography variant="h6">{selectedCentre.name}</Typography>
              <Typography variant="subtitle1">Locație: {selectedCentre.location}</Typography>
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
  );
};

export default CentresList;
