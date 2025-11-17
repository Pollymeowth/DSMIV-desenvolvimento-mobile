import React, { createContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const signIn = async (email: string, password: string) => {
    const resp = await api.post("/auth/login", { email, password });
    const { token, user } = resp.data;
    await setAuthToken(token);
    setUser(user);
  };

  const loadUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    await setAuthToken(token);
    const resp = await api.get("/auth/me");
    setUser(resp.data.user);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
