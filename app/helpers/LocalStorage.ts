type TKey = 'token'

export const LocalStorage = {
  getItem(key: TKey): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
    return null
  },

  setItem(key: TKey, value: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  },

  removeItem(key: TKey): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  },

  clear(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  },
} as const
