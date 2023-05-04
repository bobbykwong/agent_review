import { useEffect } from "react";

import { useAuthStore } from "../stores/useAuthStore";
import { refreshToken } from "../api/refreshToken";

export function useAuthInit() {
  const login = useAuthStore((s) => s.login);
  const setInitialised = useAuthStore((s) => s.setInitialised);

  useEffect(() => {
    refreshToken()
      .then(({ data: userId }) => {
        login(userId);
        setInitialised();
      })
      .catch(() => {
        setInitialised();
      });
  }, []);

  return;
}
