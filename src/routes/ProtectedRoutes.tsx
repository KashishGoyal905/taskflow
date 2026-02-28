import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../app/store";
import type { Role } from "../types/auth";

interface ProtectedRoutesProps {
  allowedRoles?: Role[];
}
export default function ProtectedRoutes({
  allowedRoles,
}: ProtectedRoutesProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
