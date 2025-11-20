import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  console.log("User in Protected Route ",user);
  
  return user ? children : <Navigate to="/login" replace />;
}
