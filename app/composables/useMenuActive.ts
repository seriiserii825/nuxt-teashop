type ActivePattern = string | readonly string[]

const MENU_ACTIVE = {
  favorites: 'dashboard-shop-store_id-favorites*',
  orders: 'dashboard-shop-store_id-orders*',
  store: 'shop-store_id',
  profile: ['profile', 'profile-edit'],
} as const

type MenuKey = keyof typeof MENU_ACTIVE

export const useMenuActive = () => {
  const route = useRoute()

  const match = (pattern: ActivePattern) => {
    const current = route.name?.toString()
    if (!current) return false

    const patterns = Array.isArray(pattern) ? pattern : [pattern]

    return patterns.some((p) =>
      p.endsWith('*') ? current.startsWith(p.slice(0, -1)) : current === p
    )
  }

  const isActive = (key: MenuKey) => {
    return match(MENU_ACTIVE[key])
  }

  return {
    isActive,
    MENU_ACTIVE, // опционально, если нужно где-то ещё
  }
}
