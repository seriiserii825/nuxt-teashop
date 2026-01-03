import type { ICreateCategoryPayload } from "~/interfaces/ICreateCategoryPayload";

export const categoryService = {
  getAll: async () => {
    const { $axios } = useNuxtApp();
    return $axios.get("/categories");
  },
  create: async (payload: ICreateCategoryPayload) => {
    const { $axios } = useNuxtApp();
    return $axios.post("/categories", payload);
  },
  update: async (id: number, payload: ICreateCategoryPayload) => {
    const { $axios } = useNuxtApp();
    return $axios.put(`/categories/${id}`, payload);
  },
  delete: async (id: number) => {
    const { $axios } = useNuxtApp();
    return $axios.delete(`/categories/${id}`);
  }
};
