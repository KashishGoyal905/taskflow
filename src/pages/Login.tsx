import { Box, Button, Stack, Typography } from "@mui/material";
import type { Role } from "../types/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = (role: Role) => {
    console.log("Login clicked");
    dispatch(
      login({
        id: "1",
        name: role === "admin" ? "Admin User" : "Member User",
        role,
      }),
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4">Login as</Typography>
        <Button variant="contained" onClick={() => handleLogin("admin")}>
          Admin
        </Button>
        <Button variant="contained" onClick={() => handleLogin("member")}>
          User
        </Button>
      </Stack>
    </Box>
  );
}
