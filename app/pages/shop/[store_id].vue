<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import { productService } from '~/api/services/productService'
  import { storeService } from '~/api/services/storeService'
  import type { ICategoryWithProductsCount } from '~/interfaces/ICategory'
  import type { IProductsPaginated, IQueryProduct } from '~/interfaces/IProduct'
  import type { IStoreFull } from '~/interfaces/IStore'

  const store_id = useIdParamFromUrl('store_id')

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
  })
  const { data: products_response, loading: products_loading } =
    useQuery<IProductsPaginated>(() =>
      productService.getAll(query.value, +store_id.value)
    )
</script>

<template>
  <section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Products Catalog"
        text="Explore our wide range of products."
        :center="true"
      />
      <div class="flex items-start gap-8">
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
        <ProductGrid
          v-else-if="products_response?.data.length"
          :products="products_response?.data || []"
          class="flex-1"
        />
        <h3 v-else class="text-center text-gray-500">
          No products found. Try adjusting your filters.
        </h3>
      </div>
    </div>
  </section>
</template>
