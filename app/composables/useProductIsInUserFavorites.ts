export default function useProductIsInUserFavorites(product_id: number) {
  const user_store = useAuthStore()
  const { user } = storeToRefs(user_store)
  if (!user.value?.favorites?.length) {
    return false
  }
  return user.value.favorites.some((product) => product.id === product_id)
}
