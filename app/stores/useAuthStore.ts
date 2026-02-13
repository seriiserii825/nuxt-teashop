import type { IUser } from '~/interfaces/IUser'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)
  const favorite_products_ids = computed(() => {
    if (
      user.value?.favorite_products &&
      user.value.favorite_products.length > 0
    ) {
      return user.value.favorite_products.map((product) => product.id)
    }
    return []
  })
  function setUser(newUser: IUser | null) {
    user.value = newUser
  }

  const last_store_id = ref<number | null>(null)
  function setLastStoreId(storeId: number | null) {
    last_store_id.value = storeId
  }
  return {
    user,
    setUser,
    favorite_products_ids,
    last_store_id,
    setLastStoreId,
  }
})
