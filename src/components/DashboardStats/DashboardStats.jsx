import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // 🔹 Păstrat Grid2 pentru compatibilitate
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 🔹 Simulăm datele pentru grafice
const mockData = [
  { name: 'Lun', value: 10 },
  { name: 'Mar', value: 20 },
  { name: 'Mie', value: 15 },
  { name: 'Joi', value: 25 },
  { name: 'Vin', value: 18 },
  { name: 'Sam', value: 30 },
  { name: 'Dum', value: 22 },
];

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    sportCenters: 0,
    weeklyTrainings: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Fetch statistici de la backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Eroare la preluarea statisticilor:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, px: 2, py: 4 }}>
      <Grid
        container
        spacing={4} // 🔹 Mai mult spațiu între carduri
        justifyContent="center"
        alignItems="center"
      >
        {/* 🔹 Card - Total Utilizatori */}
        <Grid item xs={12} md={10} lg={8}>
          <Card 
            sx={{ 
              width: '100%', 
              height: 220, 
              borderRadius: 3, 
              display: 'flex', 
              alignItems: 'center', 
              px: 4, 
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }} 
            elevation={1}
            onClick={() => navigate('/admin/rapoarte/sportivi')}
          >
            <CardContent sx={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Total Sportivi
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{stats.totalUsers}</Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔹 Card - Centre Sportive */}
        <Grid item xs={12} md={10} lg={8}>
          <Card 
            sx={{ 
              width: '100%', 
              height: 220, 
              borderRadius: 3, 
              display: 'flex', 
              alignItems: 'center', 
              px: 4 
            }} 
            elevation={1}
          >
            <CardContent sx={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Centre Absoluto
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{stats.sportCenters}</Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔹 Card - Antrenamente săptămâna aceasta */}
        <Grid item xs={12} md={10} lg={8}>
          <Card 
            sx={{ 
              width: '100%', 
              height: 220, 
              borderRadius: 3, 
              display: 'flex', 
              alignItems: 'center', 
              px: 4 
            }} 
            elevation={1}
          >
            <CardContent sx={{ width: '100%' }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Antrenamente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{stats.weeklyTrainings}</Typography>
                <ResponsiveContainer width="55%" height={120}>
                  <LineChart data={mockData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#f44336" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
