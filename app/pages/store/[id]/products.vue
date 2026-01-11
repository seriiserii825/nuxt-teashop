<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import type { IProductResponse } from '~/interfaces/IProductResponse'

  definePageMeta({
    layout: 'store',
  })

  const page = ref(1)
  const limit = ref(2)
  const search = ref('')

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<IProductResponse>(() =>
    productService.getAll(page.value, limit.value, search.value)
  )

  const columns = ref<Record<'key' | 'label', string>[]>([
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
  ])

  function updatePerPage(newLimit: number) {
    limit.value = newLimit
    refetch()
  }
  function pageChange(newPage: number) {
    page.value = newPage
    refetch()
  }

  const products = computed(() => {
    if (!response.value) return []
    return response.value.data.map((product) => ({
      ...product,
      price: `${useFormatPrice(product.price)}`,
    }))
  })

  const { debouncedFn: debouncedSearch } = useDebounce(() => {
    page.value = 1
    refetch()
  }, 500)

  watch(search, () => {
    debouncedSearch()
  })
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Products"
      description="All shop products"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="console.log('Create product')"
    />
    <FormInput
      v-model="search"
      name="search"
      placeholder="Search products..."
      class="mb-6 w-full max-w-md"
    />
    <Preloader v-if="loading" />
    <DataTable
      v-else-if="response && products.length"
      :columns="columns"
      :data="products"
      :per-page="limit"
      :total-pages="response.meta.totalPages"
      :current-page="page"
      @update:per-page="updatePerPage"
      @page-change="pageChange"
    />
    <div v-else class="text-center text-gray-500">No products found.</div>
  </div>
</template>
