import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { Role } from "../types/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fakeLoginApi } from "../api/authApi";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: fakeLoginApi,

    onSuccess: (data) => {
      dispatch(login(data));

      if (data.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLogin = (role: Role) => {
    mutation.mutate({ role });
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
        <Button
          variant="contained"
          onClick={() => handleLogin("admin")}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <CircularProgress size={20} /> : "Admin"}
        </Button>
        <Button variant="contained" onClick={() => handleLogin("member")}>
          {mutation.isPending ? <CircularProgress size={20} /> : "User"}
        </Button>

        {mutation.isError && (
          <Typography color="error">Something went wrong</Typography>
        )}
      </Stack>
    </Box>
  );
}
