import type { IUser } from '~/interfaces/IUser'

export default function useGetUserFromStore(): Ref<IUser | null> {
  const auth_store = useAuthStore()
  const { user } = storeToRefs(auth_store)
  return user
}
