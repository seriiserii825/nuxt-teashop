import { userService } from '~/api/services/userService'
import type { IUser } from '~/interfaces/IUser'

export default function useFetchProfileToPinia() {
  const { data: user } = useQuery<IUser>(userService.profile)
  const auth_store = useAuthStore()
  watch(user, (newUser) => {
    if (newUser) {
      // order user.stores by updatedAt descending
      newUser.stores.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
      auth_store.setUser(newUser)
      console.log('User set to store:', auth_store.user)
    }
  })
}
