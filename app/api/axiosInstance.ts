import axios from "axios";
import { LocalStorage } from "~/helpers/LocalStorage";

const baseURL = import.meta.env.NUXT_PUBLIC_API_BASE;
console.log("baseURL", baseURL);
export const axiosInstance = axios.create({
  // http://srv1203758.hstgr.cloud/users
  baseURL,
  headers: {
    contentType: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = LocalStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

