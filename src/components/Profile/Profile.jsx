// import * as React from 'react';
// import { extendTheme, styled } from '@mui/material/styles';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid2';
// import Logo from '../../imgs/logobjj.png';
// import { Box, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: '',
//   },
//   {
//     // segment: 'dashboard',
//     title: 'Profil',
//     icon: <PersonIcon />,
//   },
//   {
//     segment: 'orders',
//     title: 'Setari',
//     icon: <SettingsIcon />,
//   },
//   {
//     kind: 'divider',
//   },
//   {
//     kind: 'header',
//     title: '',
//   },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//     children: [
//       {
//         segment: 'sales',
//         title: 'Sales',
//         icon: <DescriptionIcon />,
//       },
//       {
//         segment: 'traffic',
//         title: 'Traffic',
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
//   {
//     segment: 'integrations',
//     title: 'Integrations',
//     icon: <LayersIcon />,
//   },
// ];

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: 'class',
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

// const Skeleton = styled('div')(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

// // Adăugăm restul codului din componenta existentă

// export default function DashboardLayoutBasic(props) {
//   const { window } = props;

//   const [userInfo, setUserInfo] = useState({
//     firstName: '',
//     lastName: '',
//     role: '',
//   });

//   const router = useDemoRouter('/dashboard');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window ? window() : undefined;

//   useEffect(() => {
//     // 🔹 Fetch user info de la un API sau localStorage
//     const fetchUserInfo = async () => {
//       try {
//           const response = await axios.get('http://localhost:8080/api/users/info', {
//               withCredentials: true, // Permite cookie-uri
//               headers: {
//                   'Content-Type': 'application/json',
//                   // 'Authorization': `Bearer ${token}` // Dacă folosești JWT
//               },
//           });
//           console.log('User info:', response.data);
//           setUserInfo(response.data); // Actualizează state-ul userInfo
//       } catch (error) {
//           console.error('Error fetching user info:', error.response?.data || error.message);
//       }
//   };  

//     fetchUserInfo();
//   }, []);

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//       branding={{
//         logo: <img src={Logo} alt="Logo" />, // Pass the Logo as a React element,
//         title: '',
//       }}
//     >
//       <DashboardLayout>
//         <PageContainer>
//           <Grid container spacing={2}>
//             <Grid
//               size={12}
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flexDirection: 'column',
//                 }}
//               >
//                 <Box
//                   component={'img'}
//                   src="https://thispersondoesnotexist.com"
//                   alt="profile_pic"
//                   sx={{
//                     width: '150px',
//                     height: '150px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                   }}
//                 ></Box>
//                 <Typography variant="h4" sx={{ mt: 2 }}>Salut, 
//                   {userInfo.firstName} {userInfo.lastName}!
//                 </Typography>
//                 <Typography variant="h6" sx={{ mt: 0 }}>
//                   {userInfo.role}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </PageContainer>
//       </DashboardLayout>
//     </AppProvider>
//   );
// }
import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
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
import DataGridUserSchedules from '../AdminPannel/raports/Orar/DataGridUserSchedules';

const NAVIGATION = [
  {
    kind: 'header',
    title: '',
  },
  {
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
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
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

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    role: '',
  });

  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/info', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('User info:', response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error.response?.data || error.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={Logo} alt="Logo" />,
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
                <Box
                  component={'img'}
                  src="https://thispersondoesnotexist.com"
                  alt="profile_pic"
                  sx={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <Typography variant="h4" sx={{ mt: 2 }}>
                  Salut, {userInfo.firstName} {userInfo.lastName}!
                </Typography>
                <Typography variant="h6" sx={{ mt: 0 }}>
                  {userInfo.role}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* Afișăm DataGrid-ul cu cursurile active */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Cursuri active
            </Typography>
            <DataGridUserSchedules />
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
