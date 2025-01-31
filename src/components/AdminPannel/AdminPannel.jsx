import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Logo from '../../imgs/logobjj.png';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardStats from '../DashboardStats/DashboardStats';

const NAVIGATION = [
  {
    kind: 'header',
    title: '',
  },
  {
    // segment: 'dashboard',
    title: 'Profil',
    icon: <PersonIcon />,
  },
  {
    segment: 'orders',
    title: 'Setari',
    icon: <SettingsIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '',
  },
  {
    segment: 'reports',
    title: 'Rapoarte',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sportivi',
        title: 'Sportivi',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'centre',
        title: 'Centre',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'antrenamente',
        title: 'Antrenamente',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

// Adăugăm restul codului din componenta existentă

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    role: '',
  });

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={Logo} alt="Logo" />, // Pass the Logo as a React element,
        title: '',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid
              size={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <h1>Panou Admin</h1>
                <DashboardStats />
              </Box>
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
