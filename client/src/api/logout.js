import { api } from "./axios";
import { useAuthStore } from "../stores/authStore";

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    useAuthStore.getState().clearAuth();
  }
}