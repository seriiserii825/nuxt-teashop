export default function useIsAdmin() {
  const auth_store = useAuthStore()
  return auth_store.user?.role === 'admin'
}
