import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTask, fetchTasks } from "../api/taskApi";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

export default function Tasks() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
    },
  });

  function handleAdd() {
    if (!title.trim()) {
      return;
    }
    mutation.mutate(title);
  }

  if (isLoading) return <CircularProgress />;
  if (isError) {
    return <Typography color="error">Error loading tasks</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={mutation.isPending}
        >
          Add
        </Button>
      </Box>

      <List>
        {data?.map((task) => (
          <ListItem key={task.id}>
            {task.title} {task.completed ? "✅" : ""}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
