<script setup lang="ts">
  defineProps({
    id: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div class="h-full border-r border-neutral-200 bg-neutral-50 p-8">
    <div class="flex items-center gap-4">
      <IconILogo />
      <span class="text-2xl font-bold text-accent-dark">TeaShop</span>
    </div>
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
