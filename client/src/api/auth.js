import axios from "axios";
import { useAuthStore } from "../stores/authStore";
const API_ORIGIN = import.meta.env.VITE_API_URL;

const refreshClient = axios.create({
  baseURL: `${API_ORIGIN}`,
  withCredentials: true,
});

export const refreshSession = async () => {
  const res = await refreshClient.post("/auth/refresh");
  const { user, accessToken } = res.data;

  useAuthStore.getState().setAuth({ user, accessToken });
  return accessToken;
}
