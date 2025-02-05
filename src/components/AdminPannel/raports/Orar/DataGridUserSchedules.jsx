import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const DataGridUserSchedules = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Preluăm simultan datele de la cele trei endpoint-uri:
        const [scheduleRes, trainerRes, centreRes] = await Promise.all([
          axios.get("http://localhost:8080/api/orar", { withCredentials: true }),
          axios.get("http://localhost:8080/api/trainer", { withCredentials: true }),
          axios.get("http://localhost:8080/api/centres", { withCredentials: true }),
        ]);

        const schedules = scheduleRes.data;
        const trainers = trainerRes.data;
        const centres = centreRes.data;

        console.log("Fetched schedules:", schedules);
        console.log("Fetched trainers:", trainers);
        console.log("Fetched centres:", centres);

        // Construim mapping-ul pentru traineri (filtrăm doar pe cei cu rolul ROLE_TRAINER)
        const trainerMap = {};
        trainers
          .filter(t => t.roles && t.roles.includes("ROLE_TRAINER"))
          .forEach(t => {
            trainerMap[t.id] = t;
          });
        console.log("Trainer map:", trainerMap);

        // Construim mapping-ul pentru centre (cheia este ID-ul centrului)
        const centreMap = {};
        centres.forEach(c => {
          centreMap[c.id] = c;
        });
        console.log("Centre map:", centreMap);

        // Filtrăm schedule‑urile pentru a păstra doar cursurile active
        // (active = schedule.endTime > momentul curent)
        const now = dayjs();
        const activeSchedules = schedules.filter(schedule => dayjs(schedule.endTime).isAfter(now));
        console.log("Active schedules:", activeSchedules);

        // Mapăm schedule‑urile active într-un array de rânduri pentru DataGrid
        const gridRows = activeSchedules.map(schedule => {
          // Determinăm numele profesorului
          let teacherName = "";
          if (schedule.teacher) {
            if (typeof schedule.teacher === "object") {
              if (schedule.teacher.firstName && schedule.teacher.lastName) {
                teacherName = `${schedule.teacher.firstName} ${schedule.teacher.lastName}`;
              } else if (schedule.teacher.id) {
                const tid = +schedule.teacher.id;
                if (trainerMap[tid]) {
                  teacherName = `${trainerMap[tid].firstName} ${trainerMap[tid].lastName}`;
                }
              }
            } else if (typeof schedule.teacher === "number") {
              const tid = schedule.teacher;
              if (trainerMap[tid]) {
                teacherName = `${trainerMap[tid].firstName} ${trainerMap[tid].lastName}`;
              }
            }
          }

          // Determinăm numele centrului și locația
          let centreName = "";
          let centreLocation = "";
          if (schedule.centre) {
            if (typeof schedule.centre === "object") {
              centreName = schedule.centre.name || "";
              centreLocation = schedule.centre.location || "";
            } else if (typeof schedule.centre === "number") {
              const cid = schedule.centre;
              if (centreMap[cid]) {
                centreName = centreMap[cid].name || "";
                centreLocation = centreMap[cid].location || "";
              }
            }
          }

          return {
            id: schedule.id, // Curs Nr.
            courseName: schedule.courseName,
            description: schedule.description,
            startTime: dayjs(schedule.startTime).format("YYYY-MM-DD HH:mm"),
            endTime: dayjs(schedule.endTime).format("YYYY-MM-DD HH:mm"),
            teacher: teacherName,
            centre: centreName,
            location: centreLocation,
          };
        });

        setRows(gridRows);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Eroare la preluarea datelor.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Curs Nr', width: 70 },
    { field: 'courseName', headerName: 'Nume Curs', width: 150 },
    { field: 'description', headerName: 'Descriere', width: 200 },
    { field: 'startTime', headerName: 'Start', width: 180 },
    { field: 'endTime', headerName: 'End', width: 180 },
    { field: 'teacher', headerName: 'Profesor', width: 150 },
    { field: 'centre', headerName: 'Centru', width: 150 },
    { field: 'location', headerName: 'Locație', width: 150 },
  ];

  if (loading) {
    return (
      <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (rows.length === 0) {
    return (
      <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">Nu există cursuri active</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSize={10} 
        rowsPerPageOptions={[10]} 
        disableSelectionOnClick 
      />
    </Box>
  );
};

export default DataGridUserSchedules;
