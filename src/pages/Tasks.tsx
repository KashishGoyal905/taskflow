import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createTask,
  deleteTaskApi,
  fetchTasks,
  toggleTaskApi,
  type Task,
} from "../api/taskApi";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function Tasks() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: createTask,

    // it runs before the mutationFn, this is specially for optimistic upadtes.
    onMutate: async (title) => {
      // It cancel only queries(/get) not mutation(/post/put/patch/delete)
      // cancel any ongoing refatch, as it can overwrite optimistic update with the old data.(suppose first refatch is going on when user first came to this page and in the meantime user has added a task but then the first refatch completes and it shows the old data.)
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      // storing previous data for rollback.
      const previousTasks = queryClient.getQueryData(["tasks"]);

      const optimisticTask = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      queryClient.setQueryData(["tasks"], (old: any) => [
        ...(old || []),
        optimisticTask,
      ]);

      return { previousTasks }; // it will become context object.
    },

    // if we face any error in the server, rollback
    onError: (err, title, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    // whether success or faliure. from this we can update the cache with server data(though it will same)
    onSettled: () => {
      // as query is constant the ui won't update untill we refatch(refocus or manual)
      // so we make this query invalidate therefore it will be refatched by useQuery. But here
      // the ui will update instantly as we are doing optimistic update. so, here we are just syncing our data with the server.
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return toggleTaskApi(taskId);
    },

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      );

      return { previousTasks };
    },

    onError: (err, taskId, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return deleteTaskApi(taskId);
    },
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any[]) =>
        old?.filter((task) => task.id !== taskId),
      );

      return { previousTasks };
    },
    onError: (err, taskId, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
            <ListItemText>{task.title}</ListItemText>
            <ListItemText>{task.id}</ListItemText>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskMutation.mutate(task.id)}
            />

            {user?.role === "admin" && (
              <Button
                color="error"
                onClick={() => deleteTaskMutation.mutate(task.id)}
              >
                Delete
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
