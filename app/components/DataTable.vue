<script setup lang="ts">
  import { computed, ref, watch } from 'vue'

  interface TableRow {
    id: string
    [key: string]: unknown
  }

  interface TableColumn {
    key: string
    label: string
    sortable?: boolean
  }

  const props = defineProps({
    data: {
      type: Array as PropType<TableRow[]>,
      required: true,
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    perPageOptions: {
      type: Array as PropType<number[]>,
      default: () => [2, 5, 10, 25, 50],
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    sortKey: {
      type: String,
      default: '',
    },
    sortOrder: {
      type: String,
      default: 'asc',
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits([
    'update:perPage',
    'sort',
    'page-change',
    'edit-row',
    'delete-row',
  ])

  const perPageModel = ref(props.perPage)

  const paginationButtons = computed(() => [
    {
      icon: '←',
      action: 'first',
      handler: () => goToPage(1),
      disabled: props.currentPage === 1,
    },
    {
      icon: '‹',
      action: 'prev',
      handler: () => goToPage(props.currentPage - 1),
      disabled: props.currentPage === 1,
    },
    {
      icon: '›',
      action: 'next',
      handler: () => goToPage(props.currentPage + 1),
      disabled: props.currentPage === props.totalPages,
    },
    {
      icon: '→',
      action: 'last',
      handler: () => goToPage(props.totalPages),
      disabled: props.currentPage === props.totalPages,
    },
  ])

  function sortBy(key: string) {
    let local_key = ''
    let local_order: 'asc' | 'desc' = 'asc'
    if (props.sortKey === key) {
      local_order = props.sortOrder === 'asc' ? 'desc' : 'asc'
      local_key = key
    } else {
      local_key = key
      local_order = 'asc'
    }
    emit('sort', { key: local_key, order: local_order })
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= props.totalPages) {
      emit('page-change', page)
    }
  }

  watch(perPageModel, (val) => {
    emit('update:perPage', val)
  })
</script>
<template>
  <div class="overflow-hidden rounded-lg bg-white shadow-sm">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-100">
          <th
            v-for="column in columns"
            :key="column.key"
            class="select-none px-5 py-4 text-left text-sm font-medium text-gray-500"
            :class="{
              'cursor-pointer hover:text-gray-700': column.sortable !== false,
              'text-blue-500': sortKey === column.key,
            }"
            @click="column.sortable !== false && sortBy(column.key)"
          >
            <div class="flex items-center gap-1">
              {{ column.label }}
              <span v-if="column.sortable !== false" class="text-xs">
                <span v-if="sortKey === column.key">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
                <span v-else class="opacity-30">↕</span>
              </span>
            </div>
          </th>
          <th class="px-5 py-4 text-left text-sm font-medium text-gray-500">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="row.id"
          class="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
          :class="{ 'bg-gray-50': index % 2 === 1 }"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-4 text-[15px] text-gray-700"
          >
            <slot
              :name="`cell-${column.key}`"
              :value="row[column.key]"
              :row="row"
            >
              {{ row[column.key] }}
            </slot>
          </td>
          <td class="flex justify-center gap-2 px-5 py-4">
            <Btn variant="btn-success" @click="$emit('edit-row', row.id)">
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </Btn>
            <Btn variant="btn-danger" @click="$emit('delete-row', row.id)">
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </Btn>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length + 1"
            class="px-5 py-10 text-center text-gray-400"
          >
            No data available.
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="showPagination"
      class="flex items-center justify-between border-t-2 border-gray-300 bg-gray-50 px-5 py-4"
    >
      <div class="flex items-center gap-3 text-sm font-medium text-gray-700">
        <span>Всего на странице</span>
        <select
          v-model="perPageModel"
          class="w-20 cursor-pointer rounded-md border-2 border-gray-400 bg-white px-2 py-1.5 font-semibold text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option v-for="n in perPageOptions" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
        <span class="font-medium text-gray-600"
          >Страница {{ currentPage }} из {{ totalPages }}</span
        >
      </div>
      <div class="flex gap-1">
        <button
          v-for="btn in paginationButtons"
          :key="btn.action"
          :disabled="btn.disabled"
          class="flex h-8 w-8 items-center justify-center rounded-md border-2 border-gray-400 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-400 disabled:hover:bg-white"
          @click="btn.handler"
        >
          {{ btn.icon }}
        </button>
      </div>
    </div>
  </div>
</template>
