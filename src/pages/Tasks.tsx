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

    // it runs before the mutationFn, this is specially for optimistic upadtes.
    onMutate: async (title) => {
      // cancel any ongoing refatch, as it can overwrite optimistic update with the old data.(suppose first refatch is going on when user first came to this page and in the meantime user has added a task but then the first refatch completes and it shows the old data.)
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      // storing previous data for rollback.
      const previousTasks = queryClient.getQueryData(["tasks"]);

      const optimisticTask = {
        id: "temp-" + Date.now(),
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
