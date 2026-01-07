import type { IUser } from '~/interfaces/IUser'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<IUser | null>(null)
    function setUser(newUser: IUser | null) {
      user.value = newUser
    }
    return {
      user,
      setUser,
    }
  },
  {
    persist: true,
  }
)
