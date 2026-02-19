export default defineNuxtPlugin(() => {
  const routes = {
    home: () => '/',
    favorites: (store_id: number) => `/dashboard/shop/${store_id}/favorites`,
    store: (store_id: number) => `/shop/${store_id}`,
  } as const

  return {
    provide: { routes },
  }
})
