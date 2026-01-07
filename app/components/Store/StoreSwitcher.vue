<script setup lang="ts">
  import type { IStore } from '~/interfaces/IStore'

  const auth_store = useAuthStore()
  const stores = computed(() => {
    if (auth_store.user && auth_store.user.stores) {
      return auth_store.user.stores
    }
    return []
  })
  const stores_options = computed(() => {
    if (!stores.value) {
      return []
    }
    return stores.value.map((store: IStore) => ({
      value: store.id,
      text: store.title,
    }))
  })
  const selectedStore = ref<string>('')
  watch(
    stores_options,
    (options) => {
      if (options.length && options[0] && !selectedStore.value) {
        selectedStore.value = options[0].value
      }
    },
    { immediate: true }
  )
</script>

<template>
  <FormSelectComplex
    v-model="selectedStore"
    :icon="['fas', 'store']"
    :options="stores_options"
  />
</template>
