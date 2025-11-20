import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PublicRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? <Navigate to="/dashboard" replace /> : children;
}
