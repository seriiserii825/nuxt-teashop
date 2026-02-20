<script setup lang="ts">
  import { cartService } from '~/api/services/cartService'
  import { categoryService } from '~/api/services/categoryService'
  import { productService } from '~/api/services/productService'
  import { storeService } from '~/api/services/storeService'
  import { userService } from '~/api/services/userService'
  import Preloader from '~/components/Preloader.vue'
  import type { ICategoryWithProductsCount } from '~/interfaces/ICategory'
  import type { IProductsPaginated, IQueryProduct } from '~/interfaces/IProduct'
  import type { IStoreFull } from '~/interfaces/IStore'

  const auth_store = useAuthStore()
  const mini_cart_store = useMiniCartStore()
  const store_id = useIdParamFromUrl('store_id')
  auth_store.setLastStoreId(+store_id.value)

  const route = useRoute()

  const { data: store, loading: store_loading } = useQuery<IStoreFull>(() =>
    storeService.getByIdFull(+store_id.value)
  )

  const { data: categories, loading: categories_loading } = useQuery<
    ICategoryWithProductsCount[]
  >(() => categoryService.getAllWithProductsCount(+store_id.value))

  const query = ref<IQueryProduct>({
    page: 1,
    limit: 12,
    search: '',
    sort_key: 'createdAt',
    sort_order: 'desc',
    category_ids: parseNumberCsv(route.query.category_ids),
    price_min: undefined,
    price_max: undefined,
    color_id: undefined,
    stars: undefined,
  })
  const {
    data: products_response,
    loading: products_loading,
    refetch,
  } = useQuery<IProductsPaginated>(() =>
    productService.getAll(query.value, +store_id.value)
  )

  const wrapRef = ref<HTMLElement | null>(null)

  async function updateCurrent(newPage: number) {
    query.value.page = newPage
    await refetch()
    scrollToTop()
  }

  function scrollToTop() {
    if (wrapRef.value) {
      wrapRef.value.scrollIntoView({ behavior: 'smooth' })
    }
  }

  watch(
    () => route.query,
    (q) => {
      query.value.category_ids = parseNumberCsv(q.category_ids)

      query.value.price_min = q.price_min ? Number(q.price_min) : undefined
      query.value.price_max = q.price_max ? Number(q.price_max) : undefined

      query.value.color_id = q.color_id ? Number(q.color_id) : undefined

      query.value.stars = q.stars ? Number(q.stars) : undefined

      query.value.sort_key = q.sort_key
        ? (String(q.sort_key) as IQueryProduct['sort_key'])
        : 'createdAt'

      query.value.sort_order = q.sort_order
        ? (String(q.sort_order) as 'asc' | 'desc')
        : 'desc'

      query.value.page = 1

      refetch()

      scrollToTop()
    }
  )

  function parseNumberCsv(param: unknown): string {
    if (!param) return ''
    return String(param)
  }

  const favorites_is_loading = ref(false)

  async function getProfile() {
    const auth_store = useAuthStore()
    const newData = await userService.profile()
    auth_store.setUser(newData)
  }

  async function toggleFavorite(product_id: number) {
    favorites_is_loading.value = true
    try {
      const data = await userService.toggleFavorite(product_id)
      await getProfile()
      useSweetAlert('success', data.message)
    } catch (error) {
      handleAxiosError(error)
    } finally {
      favorites_is_loading.value = false
    }
  }
  async function addToCart(product_id: number) {
    try {
      await cartService.add({
        product_id,
        quantity: 1,
      })
      const cart = await cartService.get()
      mini_cart_store.setCart(cart)

      useSweetAlert('success', 'Product added to cart!')
    } catch (error) {
      handleAxiosError(error)
    }
  }
</script>

<template>
  <section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Products Catalog"
        text="Explore our wide range of products."
      />
      <div ref="wrapRef" class="flex items-start gap-8 pb-10">
        <div class="w-64 flex-shrink-0 md:w-full">
          <Preloader v-if="store_loading || categories_loading" />
          <ShopSidebar
            v-else-if="store && categories"
            :categories="categories"
            :colors="store.colors"
          />
          <div v-else>
            <p class="text-red-500">Failed to load store data.</p>
          </div>
        </div>
        <Preloader v-if="products_loading || favorites_is_loading" />
        <div v-else-if="products_response?.data.length">
          <div class="flex justify-between py-6">
            <h2 class="text-md">
              Products Found:
              <span class="font-bold">{{ products_response.meta.total }}</span>
            </h2>
            <ShopOrder />
          </div>
          <ProductGrid
            :products="products_response?.data || []"
            :store-id="+store_id"
            class="mb-12"
            @toggle-favorite="toggleFavorite"
            @add-to-cart="addToCart"
          />
          <Pagination
            v-if="products_response"
            :current-page="products_response.meta.page"
            :total-pages="products_response.meta.totalPages"
            @emit_update_current="updateCurrent"
          />
        </div>
        <h3 v-else class="text-center text-gray-500">
          No products found. Try adjusting your filters.
        </h3>
      </div>
    </div>
  </section>
</template>
