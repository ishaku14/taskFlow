import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../stores/authStore"

export default function ProtectedRoute() {
  const status = useAuthStore(state => state.status);

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  }

  return <Outlet />
}