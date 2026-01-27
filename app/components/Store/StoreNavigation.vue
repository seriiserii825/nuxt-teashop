<script setup lang="ts">
  const emits = defineEmits(['emit-navigation-close'])
  const route = useRoute()

  // Автоматически закрывать навигацию при изменении роута
  watch(
    () => route.path,
    () => {
      emits('emit-navigation-close')
    }
  )

  const store = useStoreStore()
  const id = computed(() => store.store_id)
</script>

<template>
  <div>
    <NuxtLink
      to="/store"
      class="flex items-center gap-4 transition-opacity hover:opacity-80"
    >
      <IconILogo />
      <span class="text-2xl font-bold text-accent-dark">TeaShop</span>
    </NuxtLink>
    <nav class="mt-12 flex flex-col gap-4">
      <StoreLink :id="id" title="Statistics" />
      <StoreLink
        :id="id"
        slug="products"
        title="Products"
        :icon="['fab', 'product-hunt']"
      />
      <StoreLink
        :id="id"
        slug="categories"
        title="Categories"
        :icon="['fas', 'icons']"
      />
      <StoreLink
        :id="id"
        slug="colors"
        title="Colors"
        :icon="['fas', 'brush']"
      />
      <StoreLink
        :id="id"
        slug="reviews"
        title="Reviews"
        :icon="['fas', 'chart-simple']"
      />
      <StoreLink
        :id="id"
        slug="settings"
        title="Settings"
        :icon="['fas', 'gear']"
      />
    </nav>
  </div>
</template>
