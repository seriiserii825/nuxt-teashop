<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import type { ICategory } from '~/interfaces/ICategory'
  import type { TSortColumn } from '~/interfaces/TSortColumn'

  definePageMeta({
    layout: 'store',
  })

  const selected_category_id = ref<string | null>(null)
  const row_action = ref<'edit' | 'delete' | null>(null)
  const sortKey = ref<string>('') // Добавлено
  const sortOrder = ref<'asc' | 'desc'>('desc') // Добавлено
  const { $routes } = useNuxtApp()

  const storeId = useIdParamFromUrl()

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<ICategory[]>(() => categoryService.getAll(+storeId.value))

  const columns = ref<Record<'key' | 'label', string>[]>([
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'store', label: 'Store Id' },
  ])

  const categories = computed(() => {
    if (!response.value) return []
    return response.value.map((category: ICategory) => ({
      ...category,
      store: category.store?.title,
    }))
  })

  function editRow(category_id: number) {
    navigateTo($routes.store_admin_category_edit(+storeId.value, category_id))
  }
  async function deleteRow(id: string) {
    selected_category_id.value = id
    row_action.value = 'delete'
    const confirmed = await useSweetConfirm(
      'Are you sure you want to delete this category?'
    )
    if (confirmed.isConfirmed) {
      try {
        await categoryService.delete(selected_category_id.value, +storeId.value)
        useSweetAlert('success', 'Category deleted successfully')
        selected_category_id.value = null
        row_action.value = null
        refetch()
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }

  function closePopup() {
    selected_category_id.value = null
    row_action.value = null
    refetch()
  }

  function sortColumn(column: TSortColumn) {
    sortKey.value = column.key
    sortOrder.value = column.order
    refetch()
  }

  function goToCreateCategoryPage() {
    navigateTo($routes.store_admin_categories_create(+storeId.value))
  }
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Categories"
      description="All shop categories"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="goToCreateCategoryPage"
    />
    <Preloader v-if="loading" />
    <DataTable
      v-else-if="response && categories.length"
      :columns="columns"
      :data="categories"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      :show-pagination="false"
      @edit-row="editRow"
      @delete-row="deleteRow"
      @sort="sortColumn"
    />
    <div v-else class="text-center text-gray-500">No categories found.</div>
    <Popup
      v-if="selected_category_id && row_action === 'edit'"
      title="Edit category"
      @emit_close="closePopup"
    >
      <!-- <FormUpdateCategory -->
      <!--   :category-id="selected_category_id" -->
      <!--   @emit_close="closePopup" -->
      <!-- /> -->
    </Popup>
  </div>
</template>
