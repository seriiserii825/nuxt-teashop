<script setup lang="ts">
  const selectedStore = ref<string>('store1')
</script>

<template>
  <FormSelect
    v-model="selectedStore"
    label="Select Store"
    name="store-switcher"
    :options="[
      { value: 'store1', text: 'Store 1' },
      { value: 'store2', text: 'Store 2' },
      { value: 'store3', text: 'Store 3' },
    ]"
  />
</template>
