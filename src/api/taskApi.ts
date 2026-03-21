export type Task = {
    id: string;
    title: string;
    completed: boolean;
}

let fakeTasks: Task[] = [
    { id: "1", title: "Learn Tanstack", completed: false },
    { id: "2", title: "Build RBAC", completed: true },
]

export const fetchTasks = async (filterQuery: string): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (filterQuery == "completed") {
                resolve(fakeTasks.filter(t => t.completed));
            }
            if (filterQuery == "pending") {
                resolve(fakeTasks.filter(t => !t.completed));
            } else {
                resolve([...fakeTasks])
            }
        }, 1000);
    })
}

export const createTask = async (title: string): Promise<Task> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTask = {
                id: crypto.randomUUID(),
                title,
                completed: false
            }

            fakeTasks.push(newTask);
            resolve(newTask);
        }, 1000)
    })
}

export const toggleTaskApi = async (taskId: string): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTasks = fakeTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task);

            fakeTasks = newTasks;
            resolve(fakeTasks);
        }, 1000);
    });
}

export const deleteTaskApi = async (taskId: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fakeTasks = fakeTasks.filter((task) => task.id !== taskId);
            resolve(fakeTasks);
        }, 1000);
    });
}