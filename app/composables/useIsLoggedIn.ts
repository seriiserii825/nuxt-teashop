export default function useIsLoggedIn() {
  const auth_store = useAuthStore();
  return !!auth_store.email;
}
