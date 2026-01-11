<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    perPageOptions: {
      type: Array,
      default: () => [5, 10, 25, 50],
    },
  })

  const emit = defineEmits(['update:perPage', 'sort', 'page-change'])

  const sortKey = ref('')
  const sortOrder = ref('asc')
  const currentPage = ref(1)
  const perPageModel = ref(props.perPage)

  const sortedData = computed(() => {
    if (!sortKey.value) return [...props.data]

    return [...props.data].sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]

      if (aVal === bVal) return 0

      let result
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal
      } else {
        result = String(aVal).localeCompare(String(bVal), 'ru')
      }

      return sortOrder.value === 'asc' ? result : -result
    })
  })

  const totalPages = computed(
    () => Math.ceil(sortedData.value.length / perPageModel.value) || 1
  )

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPageModel.value
    return sortedData.value.slice(start, start + perPageModel.value)
  })

  const paginationButtons = computed(() => [
    {
      icon: '←',
      action: 'first',
      handler: () => goToPage(1),
      disabled: currentPage.value === 1,
    },
    {
      icon: '‹',
      action: 'prev',
      handler: () => goToPage(currentPage.value - 1),
      disabled: currentPage.value === 1,
    },
    {
      icon: '›',
      action: 'next',
      handler: () => goToPage(currentPage.value + 1),
      disabled: currentPage.value === totalPages.value,
    },
    {
      icon: '→',
      action: 'last',
      handler: () => goToPage(totalPages.value),
      disabled: currentPage.value === totalPages.value,
    },
  ])

  function sortBy(key) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
    emit('sort', { key: sortKey.value, order: sortOrder.value })
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      emit('page-change', page)
    }
  }

  function formatValue(value, column) {
    if (column.formatter) return column.formatter(value)
    return value
  }

  watch(
    () => props.data,
    () => (currentPage.value = 1)
  )
  watch(perPageModel, (val) => {
    currentPage.value = 1
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
          <th
            v-if="$slots.actions"
            class="px-5 py-4 text-left text-sm font-medium text-gray-500"
          >
            Действия
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in paginatedData"
          :key="row.id"
          class="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
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
              {{ formatValue(row[column.key], column) }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-5 py-4 text-center">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td
            :colspan="columns.length + ($slots.actions ? 1 : 0)"
            class="px-5 py-10 text-center text-gray-400"
          >
            Нет данных
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="flex items-center justify-between border-t border-gray-100 px-5 py-4"
    >
      <div class="flex items-center gap-3 text-sm text-gray-500">
        <span>Всего на странице</span>
        <select
          v-model="perPageModel"
          class="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option v-for="n in perPageOptions" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
        <span class="text-gray-400"
          >Страница {{ currentPage }} из {{ totalPages }}</span
        >
      </div>

      <div class="flex gap-1">
        <button
          v-for="btn in paginationButtons"
          :key="btn.action"
          :disabled="btn.disabled"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white"
          @click="btn.handler"
        >
          {{ btn.icon }}
        </button>
      </div>
    </div>
  </div>
</template>
