export default function useIsLoggedIn() {
  const auth_store = useAuthStore()
  const { user } = storeToRefs(auth_store)
  return computed(() => !!user.value)
}
