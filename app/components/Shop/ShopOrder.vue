<script setup lang="ts">
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const route = useRoute()

  const selectedSortKey = ref<string>(
    (route.query.sort_key as string) || 'title'
  )

  const sorkKeysOptions: ISelectOption[] = [
    { value: 'title', text: 'Title' },
    { value: 'price', text: 'Price' },
    { value: 'stars', text: 'Rating' },
    { value: 'createdAt', text: 'Created' },
  ]

  const selectedSortOrder = ref<string>(
    (route.query.sort_order as string) || 'asc'
  )

  const sortOrdersOptions: ISelectOption[] = [
    { value: 'asc', text: 'Ascending' },
    { value: 'desc', text: 'Descending' },
  ]

  const updateURL = () => {
    const query: Record<string, string> = {}

    if (selectedSortKey.value) query.sort_key = selectedSortKey.value
    if (selectedSortOrder.value) query.sort_order = selectedSortOrder.value

    // get old query from url and merge with new one

    const new_query = { ...route.query, ...query }

    navigateTo({ path: route.path, query: new_query }, { replace: true }) // чтобы не засорять history
  }

  watch(
    [selectedSortKey, selectedSortOrder],
    () => {
      updateURL()
    },
    { deep: true }
  )
  onMounted(() => {
    updateURL()
  })
</script>

<template>
  <div class="shop-order">
    <div class="flex gap-2">
      <FormSelect
        v-model="selectedSortKey"
        label="Sort by"
        name="sortKeyName"
        :options="sorkKeysOptions"
      />
      <FormSelect
        v-model="selectedSortOrder"
        label="Order"
        name="sortOrderName"
        :options="sortOrdersOptions"
      />
    </div>
  </div>
</template>
