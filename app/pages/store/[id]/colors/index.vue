<script setup lang="ts">
  import { colorService } from '~/api/services/colorService'
  import type { TableColumn } from '~~/layers/ui/components/DataTable.vue'
  import type { IColor } from '~/interfaces/IColor'
  import type { TSortColumn } from '~/interfaces/TSortColumn'

  definePageMeta({
    layout: 'store',
  })

  const selected_color_id = ref<string | null>(null)
  const row_action = ref<'edit' | 'delete' | null>(null)
  const sortKey = ref<string>('') // Добавлено
  const sortOrder = ref<'asc' | 'desc'>('desc') // Добавлено
  const { $routes } = useNuxtApp()

  const store_id = useIdParamFromUrl()

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<IColor[]>(() => colorService.getAll(+store_id.value))

  const columns = ref<TableColumn[]>([
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'value', label: 'Value', html: true },
  ])

  const colors = computed(() => {
    if (!response.value) return []
    return response.value.map((color: IColor) => ({
      ...color,
      value: `<div class="flex items-center gap-2">${color.value} <span class="ml-2 w-5 h-5 inline-block rounded-full" style="background-color: ${color.value};"></span></div>`,
    }))
  })

  function editRow(color_id: number) {
    navigateTo($routes.store_admin_color_edit(+store_id.value, color_id))
  }
  async function deleteRow(id: string) {
    selected_color_id.value = id
    row_action.value = 'delete'
    const confirmed = await useSweetConfirm(
      'Are you sure you want to delete this color?'
    )
    if (confirmed.isConfirmed) {
      try {
        await colorService.delete(selected_color_id.value, +store_id.value)
        useSweetAlert('success', 'Color deleted successfully')
        selected_color_id.value = null
        row_action.value = null
        refetch()
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }

  function closePopup() {
    selected_color_id.value = null
    row_action.value = null
    refetch()
  }

  function sortColumn(column: TSortColumn) {
    sortKey.value = column.key
    sortOrder.value = column.order
    refetch()
  }

  function goToCreateColorPage() {
    navigateTo($routes.store_admin_colors_create(+store_id.value))
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
      :sort-key="sortKey"
      :sort-order="sortOrder"
      :show-pagination="false"
      @edit-row="editRow"
      @delete-row="deleteRow"
      @sort="sortColumn"
    />
    <div v-else class="text-center text-gray-500">No colors found.</div>
    <Popup
      v-if="selected_color_id && row_action === 'edit'"
      title="Edit color"
      @emit_close="closePopup"
    >
      <!-- <FormUpdateColor -->
      <!--   :color-id="selected_color_id" -->
      <!--   @emit_close="closePopup" -->
      <!-- /> -->
    </Popup>
  </div>
</template>
