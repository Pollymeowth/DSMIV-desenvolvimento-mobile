import Constants from "expo-constants";

const extras = (Constants as any).manifest?.extra ?? (Constants as any).expoConfig?.extra ?? {};

export const API_BASE = extras.apiBase || "http://SEU_IP_LOCAL:3333/api";

export default { API_BASE };
