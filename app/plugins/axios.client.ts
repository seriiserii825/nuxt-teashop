import axios from "axios";

export default defineNuxtPlugin(() => {
  const { public: { apiBase } } = useRuntimeConfig();
    console.log(apiBase, "apiBase");

  const axiosInstance = axios.create({
    baseURL: apiBase,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
