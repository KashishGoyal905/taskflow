export type Task = {
    id: string;
    title: string;
    completed: boolean;
}

let fakeTasks: Task[] = [
    { id: "1", title: "Learn Tanstack", completed: false },
    { id: "2", title: "Build RBAC", completed: true },
    { id: "3", title: "Learn Tanstack", completed: true },
    { id: "4", title: "Build RBAC", completed: true },
    { id: "5", title: "Learn Tanstack", completed: false },
    { id: "6", title: "Build RBAC", completed: true },
    { id: "7", title: "Learn Tanstack", completed: true },
    { id: "8", title: "Build RBAC", completed: false },
    { id: "9", title: "Learn Tanstack", completed: false },
    { id: "10", title: "Build RBAC", completed: true },
    { id: "11", title: "Learn Tanstack", completed: true },
    { id: "12", title: "Build RBAC", completed: true },
    { id: "13", title: "Learn Tanstack", completed: false },
    { id: "14", title: "Build RBAC", completed: true },
    { id: "15", title: "Learn Tanstack", completed: true },
    { id: "16", title: "Build RBAC", completed: false },
]

export const fetchTasks = async (filterQuery: string, page: number, limit: number = 3): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = [...fakeTasks];
            if (filterQuery == "completed") {
                filtered = fakeTasks.filter(t => t.completed);
            }
            if (filterQuery == "pending") {
                filtered = fakeTasks.filter(t => !t.completed);
            }

            let start = (page - 1) * limit;
            let end = start + limit;

            resolve(filtered.slice(start, end));
        }, 1000);
    })
}

// export const fetchTasks = async (filterQuery: string, page: number, limit: number = 3): Promise<Task[]> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             let filtered = [...fakeTasks];
//             if (filterQuery == "completed") {
//                 filtered = fakeTasks.filter(t => t.completed);
//             }
//             if (filterQuery == "pending") {
//                 filtered = fakeTasks.filter(t => !t.completed);
//             }

//             resolve(filtered);
//         }, 1000);
//     })
// }

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