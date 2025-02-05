// src/components/AdminPannel/raports/Orar/ListaOrar.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import DataGridSchedules from "./DataGridSchedules";

const ListaOrar = () => {
  const [schedules, setSchedules] = useState([]);
  const [trainers, setTrainers] = useState({});
  const [centres, setCentres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preluăm schedule-urile, trainerii și centrele din backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Actualizează URL-ul pentru centre dacă este necesar
        const [scheduleResponse, trainerResponse, centreResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/orar", { withCredentials: true }),
          axios.get("http://localhost:8080/api/trainer", { withCredentials: true }),
          axios.get("http://localhost:8080/api/centres", { withCredentials: true }), // folosește /api/centres
        ]);

        const schedulesData = scheduleResponse.data;
        const trainersData = trainerResponse.data;
        const centresData = centreResponse.data;

        console.log("Fetched schedules:", schedulesData);
        console.log("Fetched trainers:", trainersData);
        console.log("Fetched centres:", centresData);

        // Filtrăm trainerii pentru a păstra doar cei cu rolul ROLE_TRAINER
        const filteredTrainers = trainersData.filter(trainer =>
          trainer.roles && trainer.roles.includes("ROLE_TRAINER")
        );
        console.log("Filtered trainers (ROLE_TRAINER):", filteredTrainers);

        // Construim mapping-ul pentru traineri: cheia este ID-ul
        const trainersMap = {};
        filteredTrainers.forEach(trainer => {
          trainersMap[trainer.id] = trainer;
        });
        console.log("Trainers map:", trainersMap);

        // Construim mapping-ul pentru centre: cheia este ID-ul
        const centresMap = {};
        centresData.forEach(centre => {
          centresMap[centre.id] = centre;
        });
        console.log("Centres map:", centresMap);

        setSchedules(schedulesData);
        setTrainers(trainersMap);
        setCentres(centresMap);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Eroare la preluarea datelor.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  
  // return (
  //   <Box sx={{ p: 2 }}>
  //     <Typography variant="h4" gutterBottom>
  //       Cursuri
  //     </Typography>
  //     <Divider sx={{ mb: 2 }} />
  //     <List>
  //       {schedules.map(schedule => {
  //         console.log(`Schedule ${schedule.id} teacher field:`, schedule.teacher);
  //         console.log(`Schedule ${schedule.id} centre field:`, schedule.centre);

  //         // Determinarea datelor profesorului
  //         let teacherFirstName = "";
  //         let teacherLastName = "";

  //         if (schedule.teacher) {
  //           if (typeof schedule.teacher === "object") {
  //             if (schedule.teacher.firstName && schedule.teacher.lastName) {
  //               teacherFirstName = schedule.teacher.firstName;
  //               teacherLastName = schedule.teacher.lastName;
  //               console.log(`Schedule ${schedule.id}: Teacher data din schedule -> ${teacherFirstName} ${teacherLastName}`);
  //             } else if (schedule.teacher.id) {
  //               const id = +schedule.teacher.id;
  //               if (trainers[id]) {
  //                 teacherFirstName = trainers[id].firstName;
  //                 teacherLastName = trainers[id].lastName;
  //                 console.log(`Schedule ${schedule.id}: Teacher data din trainersMap -> ${teacherFirstName} ${teacherLastName}`);
  //               } else {
  //                 console.warn(`Schedule ${schedule.id}: Nu am găsit profesorul cu id ${id} în trainersMap.`);
  //               }
  //             }
  //           } else if (typeof schedule.teacher === "number") {
  //             const id = schedule.teacher;
  //             if (trainers[id]) {
  //               teacherFirstName = trainers[id].firstName;
  //               teacherLastName = trainers[id].lastName;
  //               console.log(`Schedule ${schedule.id}: Teacher data din trainersMap (teacher e număr) -> ${teacherFirstName} ${teacherLastName}`);
  //             } else {
  //               console.warn(`Schedule ${schedule.id}: Nu am găsit profesorul cu id ${id} în trainersMap.`);
  //             }
  //           }
  //         } else {
  //           console.warn(`Schedule ${schedule.id}: Nu există field teacher.`);
  //         }

  //         // Determinarea datelor centrului
  //         let centreName = "";
  //         if (schedule.centre) {
  //           if (typeof schedule.centre === "object") {
  //             if (schedule.centre.name) {
  //               centreName = schedule.centre.name;
  //               console.log(`Schedule ${schedule.id}: Centre data din schedule -> ${centreName}`);
  //             } else {
  //               console.warn(`Schedule ${schedule.id}: Obiectul centre este prezent, dar nu conține name.`);
  //             }
  //           } else if (typeof schedule.centre === "number") {
  //             const centreId = schedule.centre;
  //             if (centres[centreId]) {
  //               centreName = centres[centreId].name;
  //               console.log(`Schedule ${schedule.id}: Centre data din centresMap -> ${centreName}`);
  //             } else {
  //               console.warn(`Schedule ${schedule.id}: Nu am găsit centrul cu id ${centreId} în centresMap.`);
  //             }
  //           }
  //         } else {
  //           console.warn(`Schedule ${schedule.id}: Nu există field centre.`);
  //         }

  //         return (
  //           <ListItem
  //             key={schedule.id}
  //             sx={{ mb: 2, border: "1px solid #ccc", borderRadius: "4px", p: 1 }}
  //           >
  //             <ListItemText
  //               primary={`Curs Nr: ${schedule.id} - ${schedule.description}`}
  //               secondary={
  //                 <>
  //                   <Typography variant="body2">
  //                     Start: {dayjs(schedule.startTime).format("HH:mm")}
  //                   </Typography>
  //                   <Typography variant="body2">
  //                     End: {dayjs(schedule.endTime).format("HH:mm")}
  //                   </Typography>
  //                   {centreName && (
  //                     <Typography variant="body2">
  //                       Centru: {centreName}
  //                     </Typography>
  //                   )}
  //                   {teacherFirstName || teacherLastName ? (
  //                     <Typography variant="body2">
  //                       Profesor: {teacherFirstName} {teacherLastName}
  //                     </Typography>
  //                   ) : (
  //                     <Typography variant="body2" color="gray">
  //                       Profesor necunoscut
  //                     </Typography>
  //                   )}
  //                 </>
  //               }
  //             />
  //           </ListItem>
  //         );
  //       })}
  //     </List>
  //   </Box>
  // );
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cursuri Active
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <DataGridSchedules />
    </Box>
  );
};

export default ListaOrar;