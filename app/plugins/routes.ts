export default defineNuxtPlugin(() => {
  const routes = {
    home: () => '/',
    register: () => '/register',
    login: () => '/login',
    favorites: (store_id: number) => `/dashboard/shop/${store_id}/favorites`,
    store: (store_id: number) => `/shop/${store_id}`,
    product_detail: (store_id: number, product_id: number) =>
      `/shop/${store_id}/product/${product_id}`,
  } as const

  return {
    provide: { routes },
  }
})
