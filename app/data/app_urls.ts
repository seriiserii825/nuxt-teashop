export const ROUTES = {
  HOME: {
    path: '/',
    label: 'Home',
    icon: ['fas', 'house'],
  },

  STYLE_GUIDES: {
    path: '/style-guides',
    label: 'Style Guides',
    icon: ['fas', 'gauge'],
  },

  COLORS: {
    path: '/style-guides/colors',
    label: 'Colors',
    icon: ['fas', 'palette'],
  },

  ICONS: {
    path: '/style-guides/icons',
    label: 'Icons',
    icon: ['fas', 'icons'],
  },

  COMPONENTS: {
    path: '/style-guides/components',
    label: 'Components',
    icon: ['fas', 'hand-pointer'],
  },

  BUTTONS: {
    path: '/style-guides/components',
    label: 'Buttons',
    icon: ['fas', 'hand-pointer'],
  },

  BREADCRUMBS: {
    path: '/style-guides/components/breadcrumbs',
    label: 'Breadcrumbs',
    icon: ['fas', 'ellipsis'],
  },

  INPUTS: {
    path: '/style-guides/components/inputs',
    label: 'Inputs',
    icon: ['fas', 'keyboard'],
  },

  SELECTS: {
    path: '/style-guides/components/selects',
    label: 'Selects',
    icon: ['fas', 'caret-down'],
  },

  SELECT_COMPLEX: {
    path: '/style-guides/components/select-complex',
    label: 'SelectComplex',
    icon: ['fas', 'caret-down'],
  },

  CHECKBOX_GROUP: {
    path: '/style-guides/components/checkbox-group',
    label: 'CheckboxGroup',
    icon: ['fas', 'check'],
  },

  RADIO: {
    path: '/style-guides/components/radio',
    label: 'Radio',
    icon: ['fas', 'circle-dot'],
  },

  PRODUCT_GRID: {
    path: '/style-guides/blocks/product-grid',
    label: 'ProductGrid',
    icon: ['fas', 'border-all'],
  },

  FRONT_HEADERS: {
    path: '/style-guides/blocks/front-headers',
    label: 'FrontHeaders',
    icon: ['fas', 'circle-info'],
  },
} as const

export type RouteItem = (typeof ROUTES)[keyof typeof ROUTES]

export type RouteItemWithId = RouteItem & {
  id: number
}

export const ROUTE_LIST: RouteItemWithId[] = Object.values(ROUTES).map(
  (route, index) => ({
    id: index + 1,
    ...route,
  })
)
