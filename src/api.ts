// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:10010/api", // backend URL
  withCredentials: true,                // 🔥 important for cookies
});

export default api;
