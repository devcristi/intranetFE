import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { useLocation, Outlet, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Box, Breadcrumbs, Link, Typography, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demoTheme = extendTheme({});

function buildBreadcrumbs(pathname) {
  const pathParts = pathname.split('/').filter(Boolean);
  const crumbLinks = [];
  let cumulative = '';
  pathParts.forEach(part => {
    cumulative += `/${part}`;
    const displayName = part.charAt(0).toUpperCase() + part.slice(1);
    crumbLinks.push({ name: displayName, href: cumulative });
  });
  return crumbLinks;
}

export default function AdminPannel({ drawerOpen, setDrawerOpen }) {
  const location = useLocation();

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  return (
    <AppProvider theme={demoTheme}>
      <DashboardLayout drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <List>
              <ListItem
                button
                component={RouterLink}
                to="/admin"
                selected={location.pathname === '/admin'}
                sx={{ color: location.pathname === '/admin' ? 'primary.main' : 'inherit' }}
              >
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/admin/setari"
                selected={location.pathname === '/admin/setari'}
                sx={{ color: location.pathname === '/admin/setari' ? 'primary.main' : 'inherit' }}
              >
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Setari" />
              </ListItem>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon><BarChartIcon /></ListItemIcon>
                  <ListItemText primary="Rapoarte" />
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      button
                      component={RouterLink}
                      to="/admin/sportivi"
                      selected={location.pathname === '/admin/sportivi'}
                      sx={{ color: location.pathname === '/admin/sportivi' ? 'primary.main' : 'inherit' }}
                    >
                      <ListItemIcon><DescriptionIcon /></ListItemIcon>
                      <ListItemText primary="Sportivi" />
                    </ListItem>
                    <ListItem
                      button
                      component={RouterLink}
                      to="/admin/centre"
                      selected={location.pathname === '/admin/centre'}
                      sx={{ color: location.pathname === '/admin/centre' ? 'primary.main' : 'inherit' }}
                    >
                      <ListItemIcon><DescriptionIcon /></ListItemIcon>
                      <ListItemText primary="Centre" />
                    </ListItem>
                    <ListItem
                      button
                      component={RouterLink}
                      to="/admin/antrenamente"
                      selected={location.pathname === '/admin/antrenamente'}
                      sx={{ color: location.pathname === '/admin/antrenamente' ? 'primary.main' : 'inherit' }}
                    >
                      <ListItemIcon><DescriptionIcon /></ListItemIcon>
                      <ListItemText primary="Antrenamente" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <ListItem
                button
                component={RouterLink}
                to="/admin/integrations"
                selected={location.pathname === '/admin/integrations'}
                sx={{ color: location.pathname === '/admin/integrations' ? 'primary.main' : 'inherit' }}
              >
                <ListItemIcon><LayersIcon /></ListItemIcon>
                <ListItemText primary="Integrations" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <PageContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs.map((crumb, idx) => {
                      const isLast = idx === breadcrumbs.length - 1;
                      return isLast ? (
                        <Typography key={idx} color="text.primary">
                          {crumb.name}
                        </Typography>
                      ) : (
                        <Link
                          key={idx}
                          component={RouterLink}
                          to={crumb.href}
                          color="inherit"
                          underline="hover"
                          sx={{ color: location.pathname === crumb.href ? 'primary.main' : 'inherit' }}
                        >
                          {crumb.name}
                        </Link>
                      );
                    })}
                  </Breadcrumbs>
                </Grid>
                <Grid
                  item
                  xs={12}
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
                    <Outlet />
                  </Box>
                </Grid>
              </Grid>
            </PageContainer>
          </Grid>
        </Grid>
      </DashboardLayout>
    </AppProvider>
  );
}