import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  status: "loading",

  setAuth: ({ user, accessToken }) => set({
    user,
    accessToken,
    status: "authenticated",
  }),

  setToken: (token) => set({ accessToken: token }),

  updateUser: (patch) => set(state => ({
    user: state.user ? { ...state.user, ...patch } : state.user,
  })),

  clearAuth: () => set({
    user: null,
    accessToken: null,
    status: "unauthenticated",
  })
  
}));