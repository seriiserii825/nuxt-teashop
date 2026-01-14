<script setup lang="ts">
  import { colorService } from '~/api/services/colorService'
  import type { IColor, IColorResponse } from '~/interfaces/IColor'
  import type { TSortColumn } from '~/interfaces/TSortColumn'

  definePageMeta({
    layout: 'store',
  })

  const page = ref(1)
  const limit = ref(2)
  const search = ref('')
  const selected_color_id = ref<string | null>(null)
  const row_action = ref<'edit' | 'delete' | null>(null)
  const sortKey = ref<string>('') // Добавлено
  const sortOrder = ref<'asc' | 'desc'>('desc') // Добавлено
  const storeId = useIdParamFromUrl()

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<IColorResponse>(() =>
    colorService.getByStoreId(
      storeId.value,
      page.value,
      limit.value,
      search.value,
      sortKey.value,
      sortOrder.value
    )
  )

  const columns = ref<Record<'key' | 'label', string>[]>([
    { key: 'name', label: 'Name' },
    { key: 'value', label: 'Value' },
  ])

  function updatePerPage(newLimit: number) {
    limit.value = newLimit
    refetch()
  }
  function pageChange(newPage: number) {
    page.value = newPage
    refetch()
  }

  const colors = computed(() => {
    if (!response.value) return []
    return response.value.data.map((color: IColor) => ({
      ...color,
    }))
  })

  const { debouncedFn: debouncedSearch } = useDebounce(() => {
    page.value = 1
    refetch()
  }, 500)

  function editRow(color_id: string) {
    const url = `/store/${storeId.value}/colors/${color_id}/edit`
    navigateTo(url)
  }
  async function deleteRow(id: string) {
    selected_color_id.value = id
    row_action.value = 'delete'
    const confirmed = await useSweetConfirm(
      'Are you sure you want to delete this color?'
    )
    if (confirmed.isConfirmed) {
      try {
        await colorService.delete(selected_color_id.value)
        useSweetAlert('success', 'Color deleted successfully')
        selected_color_id.value = null
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

  function sortColumn(column: TSortColumn) {
    sortKey.value = column.key
    sortOrder.value = column.order
    page.value = 1 // Сбрасываем на первую страницу при сортировке
    refetch()
  }

  function goToCreateColorPage() {
    const current_store_id = useIdParamFromUrl()
    navigateTo(`/store/${current_store_id.value}/colors/create`)
  }
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Colors"
      description="All shop colors"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="goToCreateColorPage"
    />
    <Preloader v-if="loading" />
    <DataTable
      v-else-if="response && colors.length"
      :columns="columns"
      :data="colors"
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
    <div v-else class="text-center text-gray-500">No colors found.</div>
  </div>
</template>
