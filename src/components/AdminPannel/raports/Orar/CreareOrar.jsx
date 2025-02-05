import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme, useMediaQuery } from "@mui/material";

// Extinde dayjs cu plugin-urile necesare pentru a lucra cu fusul orar
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateSchedule = ({ onScheduleCreated }) => {
  // Inițializează valorile cu fusul orar "Europe/Bucharest"
  const [startTime, setStartTime] = useState(dayjs().tz("Europe/Bucharest"));
  const [endTime, setEndTime] = useState(dayjs().tz("Europe/Bucharest"));
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [centreId, setCentreId] = useState(""); // opțional, dacă se asociază un centru
  const [teacherId, setTeacherId] = useState(""); // pentru selectarea profesorului
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teachers, setTeachers] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Încarcă lista profesorilor din backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/trainer", { withCredentials: true })
      .then((response) => {
        const allTeachers = response.data;
        // Păstrează doar utilizatorii cu rolul "ROLE_TRAINER"
        const filteredTeachers = allTeachers.filter(teacher =>
          teacher.roles && teacher.roles.includes("ROLE_TRAINER")
        );
        setTeachers(filteredTeachers);
      })
      .catch((err) => {
        console.error("Eroare la preluarea profesorilor:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Folosește formatul "YYYY-MM-DDTHH:mm:ss" pentru a păstra ora locală
      // Parametrul 'true' la tz() indică menținerea orei locale
      const schedule = {
        startTime: startTime ? startTime.tz("Europe/Bucharest", true).format("YYYY-MM-DDTHH:mm:ss") : null,
        endTime: endTime ? endTime.tz("Europe/Bucharest", true).format("YYYY-MM-DDTHH:mm:ss") : null,
        description,
        courseName,
        centre: centreId ? { id: centreId } : null,
        teacher: teacherId ? { id: teacherId } : null,
      };

      const response = await axios.post(
        "http://localhost:8080/api/orar",
        schedule,
        { withCredentials: true }
      );
      setSuccess("Orar creat cu succes!");
      if (onScheduleCreated) {
        onScheduleCreated(response.data);
      }
      // Resetare câmpuri la valorile implicite (cu fusul orar "Europe/Bucharest")
      setStartTime(dayjs().tz("Europe/Bucharest"));
      setEndTime(dayjs().tz("Europe/Bucharest"));
      setDescription("");
      setCourseName("");
      setCentreId("");
      setTeacherId("");
    } catch (err) {
      console.error(err);
      setError("Eroare la crearea orarului.");
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h4" gutterBottom>
        Creează un nou curs
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Ora de începere
            </Typography>
            {isMobile ? (
              <MobileDateTimePicker
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            ) : (
              <StaticDateTimePicker
                displayStaticWrapperAs="desktop"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Ora de finalizare
            </Typography>
            {isMobile ? (
              <MobileDateTimePicker
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            ) : (
              <StaticDateTimePicker
                displayStaticWrapperAs="desktop"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            )}
          </Box>
        </Box>
      </LocalizationProvider>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Detalii curs
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nume Curs"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descriere"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="ID Centru (opțional)"
          value={centreId}
          onChange={(e) => setCentreId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        {/* Select pentru profesori */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="teacher-select-label">Profesor</InputLabel>
          <Select
            labelId="teacher-select-label"
            label="Profesor"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Creează Orar
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

export default CreateSchedule;