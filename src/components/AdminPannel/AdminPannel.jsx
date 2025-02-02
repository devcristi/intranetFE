import * as React from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  extendTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";

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

function buildBreadcrumbs(pathname) {
  const pathParts = pathname.split("/").filter(Boolean);
  const crumbLinks = [];
  let cumulative = "";
  pathParts.forEach((part) => {
    cumulative += `/${part}`;
    const displayName = part.charAt(0).toUpperCase() + part.slice(1);
    crumbLinks.push({ name: displayName, href: cumulative });
  });
  return crumbLinks;
}

export default function AdminPannel({ drawerOpen, setDrawerOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Toolpad așteaptă un ARRAY pentru `navigation`
  const NAVIGATION = [
    {
      segment: "admin",
      title: "Profil",
      icon: <PersonIcon />,
      onClick: () => navigate("/admin"), // 🔥 Navigare fără refresh
    },
    {
      segment: "setari",
      title: "Setari",
      icon: <SettingsIcon />,
      onClick: () => navigate("/admin/setari"),
    },
    {
      kind: "divider",
    },
    {
      segment: "admin",
      title: "Rapoarte",
      icon: <BarChartIcon />,
      defaultExpanded: true, // 🔥 Mereu deschis
      children: [
        {
          segment: "sportivi",
          title: "Sportivi",
          icon: <DescriptionIcon />,
          onClick: () => navigate("/admin/sportivi"),
        },
        {
          segment: "centre",
          title: "Centre",
          icon: <DescriptionIcon />,
          onClick: () => navigate("/admin/centre"),
        },
        {
          segment: "antrenamente",
          title: "Antrenamente",
          icon: <DescriptionIcon />,
          onClick: () => navigate("/admin/antrenamente"),
        },
      ],
    },
  ];

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
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
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(crumb.href);
                      }}
                      color="inherit"
                      underline="hover"
                      sx={{ cursor: "pointer" }}
                    >
                      {crumb.name}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
