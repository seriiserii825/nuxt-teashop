export default defineNuxtPlugin(() => {
  const routes = {
    // ─── Root ─────────────────────────────────────────────────────────────────
    home: () => '/',

    // ─── Auth ─────────────────────────────────────────────────────────────────
    login: () => '/login',
    register: () => '/register',

    // ─── Dashboard ────────────────────────────────────────────────────────────
    dashboard: () => '/dashboard',
    dashboard_profile: () => '/dashboard/profile',
    dashboard_orders: () => '/dashboard/orders',
    dashboard_settings: () => '/dashboard/settings',
    dashboard_favorites: (store_id: number) => `/dashboard/shop/${store_id}/favorites`,

    // ─── Front Shop ───────────────────────────────────────────────────────────
    store: (store_id: number) => `/shop/${store_id}`,
    product_detail: (store_id: number, product_id: number) =>
      `/shop/${store_id}/product/${product_id}`,
    favorites: (store_id: number) => `/dashboard/shop/${store_id}/favorites`,

    // ─── Admin: Store list & orders ───────────────────────────────────────────
    store_admin: () => '/store',
    store_admin_orders: () => '/store/orders',

    // ─── Admin: Store [id] ────────────────────────────────────────────────────
    store_admin_id: (id: number) => `/store/${id}`,
    store_admin_settings: (id: number) => `/store/${id}/settings`,

    // ─── Admin: Products ──────────────────────────────────────────────────────
    store_admin_products: (id: number) => `/store/${id}/products`,
    store_admin_products_create: (id: number) => `/store/${id}/products/create`,
    store_admin_product_edit: (id: number, product_id: number) =>
      `/store/${id}/products/${product_id}/edit`,

    // ─── Admin: Categories ────────────────────────────────────────────────────
    store_admin_categories: (id: number) => `/store/${id}/categories`,
    store_admin_categories_create: (id: number) => `/store/${id}/categories/create`,
    store_admin_category_edit: (id: number, category_id: number) =>
      `/store/${id}/categories/${category_id}/edit`,

    // ─── Admin: Colors ────────────────────────────────────────────────────────
    store_admin_colors: (id: number) => `/store/${id}/colors`,
    store_admin_colors_create: (id: number) => `/store/${id}/colors/create`,
    store_admin_color_edit: (id: number, color_id: number) =>
      `/store/${id}/colors/${color_id}/edit`,

    // ─── Admin: Reviews ───────────────────────────────────────────────────────
    store_admin_reviews: (id: number) => `/store/${id}/reviews`,
    store_admin_reviews_create: (id: number) => `/store/${id}/reviews/create`,
    store_admin_review_edit: (id: number, review_id: number) =>
      `/store/${id}/reviews/${review_id}/edit`,

    // ─── Style Guides ─────────────────────────────────────────────────────────
    style_guides: () => '/style-guides',
    style_guides_icons: () => '/style-guides/icons',
    style_guides_colors: () => '/style-guides/colors',
    style_guides_blocks_front_headers: () => '/style-guides/blocks/front-headers',
    style_guides_blocks_product_grid: () => '/style-guides/blocks/product-grid',
    style_guides_components: () => '/style-guides/components',
    style_guides_components_breadcrumbs: () => '/style-guides/components/breadcrumbs',
    style_guides_components_inputs: () => '/style-guides/components/inputs',
    style_guides_components_selects: () => '/style-guides/components/selects',
    style_guides_components_select_complex: () => '/style-guides/components/select-complex',
    style_guides_components_checkbox_group: () => '/style-guides/components/checkbox-group',
    style_guides_components_radio: () => '/style-guides/components/radio',
  } as const

  return {
    provide: { routes },
  }
})
