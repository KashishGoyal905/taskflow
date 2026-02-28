import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { DashBoard } from "../pages/DashBoard";
import Tasks from "../pages/Tasks";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}
