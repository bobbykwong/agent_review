import { create } from "zustand";

import { User } from "@/features/users";

import { unsetAccessToken } from "../api/unsetAccessToken";

export interface Auth {
  initialised: boolean;
  setInitialised: () => void;
  userId: User["id"] | null;
  isLoggedIn: boolean;
  login: (userId: User["id"]) => void;
  logout: () => void;
}

export const useAuthStore = create<Auth>((set) => ({
  initialised: false,
  setInitialised: () => set({ initialised: true }),
  userId: null,
  isLoggedIn: false,
  login: (userId) => set({ userId, isLoggedIn: true }),
  logout: () => {
    set({ userId: null, isLoggedIn: false });
    unsetAccessToken(); // not the best idea to have side-effect here
  },
}));
