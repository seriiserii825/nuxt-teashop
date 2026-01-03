// api/services/authService.ts
import type { IAuthPayload } from "~/interfaces/IAuthPayload";

export const authService = {
  login: async (payload: IAuthPayload): Promise<{ data: { access_token: string } }> => {
    const { $axios } = useNuxtApp();
    return $axios.post("/auth/login", payload);
  },

  logout: () => {
    // Clear user session or token
  },

  register: async (payload: IAuthPayload): Promise<void> => {
    const { $axios } = useNuxtApp();
    return $axios.post("/users", payload);
  },

  getMe: async () => {
    const { $axios } = useNuxtApp();
    const auth_store = useAuthStore();
    const response = await $axios.get("/auth/profile");
    auth_store.setEmail(response.data.email);
  },
};
