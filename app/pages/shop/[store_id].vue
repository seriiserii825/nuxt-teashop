<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import { productService } from '~/api/services/productService'
  import { storeService } from '~/api/services/storeService'
  import Preloader from '~/components/Preloader.vue'
  import type { ICategoryWithProductsCount } from '~/interfaces/ICategory'
  import type { IProductsPaginated, IQueryProduct } from '~/interfaces/IProduct'
  import type { IStoreFull } from '~/interfaces/IStore'

  const store_id = useIdParamFromUrl('store_id')

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
    sortKey: 'createdAt',
    sortOrder: 'desc',
    category_ids: parseNumberCsv(route.query.category_ids),
    price_min: undefined,
    price_max: undefined,
    color_id: undefined,
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

      query.value.page = 1

      refetch()
    }
  )

  function parseNumberCsv(param: unknown): string {
    if (!param) return ''
    return String(param)
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
        <Preloader v-if="products_loading" />
        <div v-else-if="products_response?.data.length">
          <ProductGrid
            :products="products_response?.data || []"
            class="mb-12"
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
