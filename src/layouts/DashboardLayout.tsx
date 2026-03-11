import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { navigation } from "../routes/navigation";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useContext } from "react";
import { ColorModeContext } from "../app/ThemeContext";
// import "remixicon/fonts/remixicon.css";

const drawerWidth = 240;
// interface DashboardLayoutProps {
//   children: ReactNode;
// }

export default function DashboardLayout() {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            TaskFlow Pro
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <IconButton onClick={colorMode.toggleColorMode}>
              <i className="ri-moon-line"></i>
            </IconButton>
            <button
              style={{
                color: "red",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <List>
            {navigation
              .filter((item) => userRole && item.roles.includes(userRole))
              .map((item) => (
                <ListItemButton
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    "&.active": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
          </List>
        </Box>
      </Drawer>

      {/* MainContent */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
