export type Task = {
    id: string;
    title: string;
    completed: boolean;
}

let fakeTasks: Task[] = [
    { id: "1", title: "Learn Tanstack", completed: false },
    { id: "2", title: "Build RBAC", completed: true },
]

export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...fakeTasks])
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