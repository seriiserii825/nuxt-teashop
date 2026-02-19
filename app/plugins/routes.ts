export default defineNuxtPlugin(() => {
  const routes = {
    home: () => '/',
    favorites: (store_id: number) => `/dashboard/shop/${store_id}/favorites`,
  } as const

  return {
    provide: { routes },
  }
})
