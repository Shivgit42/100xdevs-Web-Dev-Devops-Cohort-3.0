import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import api, { setAccessToken } from "../api/axios";
import type { AuthUser } from "../types";
import { Ctx } from "./Ctx";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        //
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signin = async (email: string, password: string) => {
    const { data } = await api.post("/api/v1/user/signin", {
      email,
      password,
    });
    setAccessToken(data.accessToken);
    setUser(data.user as AuthUser);
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await api.post("/api/v1/user/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    await signin(email, password);
  };

  const signout = async () => {
    try {
      await api.post("/api/v1/user/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, signin, signup, signout }),
    [user, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
