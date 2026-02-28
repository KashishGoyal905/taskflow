import type { Role } from "../types/auth";

export interface NavigationProps {
    label: string;
    path: string;
    roles: Role[];
}

export const navigation: NavigationProps[] = [
    {
        label: "DashBoard",
        path: "/",
        roles: ["admin", "member"],
    },
    {
        label: "Tasks",
        path: "/tasks",
        roles: ["admin", "member"],
    },
    {
        label: "Admin Panel",
        path: "/admin",
        roles: ["admin"],
    },
]