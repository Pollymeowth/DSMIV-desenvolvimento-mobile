import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../config";

export const api = axios.create({
  baseURL: API_BASE,
});

export const setAuthToken = async (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("token");
  }
};
