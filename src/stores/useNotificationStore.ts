import { create } from "zustand";

export interface Notification {
  msg: string;
  status: "success" | "error";
}

interface NotificationState {
  notification: Notification | null;
  notify: (n: Notification) => void;
  dismiss: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  notify: (n) =>
    set({
      notification: n,
    }),
  dismiss: () =>
    set({
      notification: null,
    }),
}));
