import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { useAuthStore } from "./stores/authStore";
import { getRefreshPromise } from "./api/axios";

function App() {
  useEffect(() => {
    getRefreshPromise().catch(() => {
      useAuthStore.getState().clearAuth();
    })
  }, []);

  return(
    <Routes>
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />

      {/* Protected Route - requires authentication to access */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={ <Dashboard /> } />
      </Route>
    </Routes>
  );
}

export default App;