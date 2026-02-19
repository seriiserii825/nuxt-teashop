<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import type { TableColumn } from '~/components/DataTable.vue'
  import type { IProduct } from '~/interfaces/IProduct'
  import type { IProductResponse } from '~/interfaces/IProductResponse'
  import type { TSortColumn } from '~/interfaces/TSortColumn'

  definePageMeta({
    layout: 'store',
  })

  const page = ref(1)
  const limit = ref(25)
  const search = ref('')
  const selected_product_id = ref<string | null>(null)
  const row_action = ref<'edit' | 'delete' | null>(null)
  const sortKey = ref<string>('') // Добавлено
  const sortOrder = ref<'asc' | 'desc'>('desc') // Добавлено
  const { $routes } = useNuxtApp()

  const storeId = useIdParamFromUrl()

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<IProductResponse>(() =>
    productService.getByStoreId(
      storeId.value,
      page.value,
      limit.value,
      search.value,
      sortKey.value,
      sortOrder.value
    )
  )

  const columns = ref<TableColumn[]>([
    { key: 'image', label: 'Image', html: true, sortable: false },
    { key: 'title', label: 'Title' },
    { key: 'color', label: 'Color' },
    { key: 'category', label: 'Category' },
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
    return response.value.data.map((product: IProduct) => ({
      ...product,
      image: product.images[0]
        ? `<img width="100" src="${userGetServerUrl(product.images[0])}" alt="product" />`
        : null,
      price: `${useFormatPrice(product.price)}`,
      color: product.color?.name,
      category: product.category?.title,
    }))
  })

  const { debouncedFn: debouncedSearch } = useDebounce(() => {
    page.value = 1
    refetch()
  }, 500)

  function editRow(product_id: string) {
    navigateTo($routes.store_admin_product_edit(+storeId.value, +product_id))
  }
  async function deleteRow(id: string) {
    selected_product_id.value = id
    row_action.value = 'delete'
    const confirmed = await useSweetConfirm(
      'Are you sure you want to delete this product?'
    )
    if (confirmed.isConfirmed) {
      try {
        await productService.delete(selected_product_id.value, +storeId.value)
        useSweetAlert('success', 'Product deleted successfully')
        selected_product_id.value = null
        row_action.value = null
        refetch()
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }

  watch(search, () => {
    debouncedSearch()
  })

  function closePopup() {
    selected_product_id.value = null
    row_action.value = null
    refetch()
  }

  function sortColumn(column: TSortColumn) {
    sortKey.value = column.key
    sortOrder.value = column.order
    page.value = 1 // Сбрасываем на первую страницу при сортировке
    refetch()
  }

  function goToCreateProductPage() {
    navigateTo($routes.store_admin_products_create(+storeId.value))
  }
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Products"
      description="All shop products"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="goToCreateProductPage"
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
      :sort-key="sortKey"
      :sort-order="sortOrder"
      @update:per-page="updatePerPage"
      @page-change="pageChange"
      @edit-row="editRow"
      @delete-row="deleteRow"
      @sort="sortColumn"
    />
    <div v-else class="text-center text-gray-500">No products found.</div>
    <Popup
      v-if="selected_product_id && row_action === 'edit'"
      title="Edit product"
      @emit_close="closePopup"
    >
      <FormUpdateProduct
        :product-id="selected_product_id"
        @emit_close="closePopup"
      />
    </Popup>
  </div>
</template>
