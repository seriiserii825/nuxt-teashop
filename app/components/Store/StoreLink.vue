<script setup lang="ts">
  const { $routes } = useNuxtApp()

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      required: false,
      default: () => ['fas', 'chart-bar'],
    },
  })

  type SlugKey = '' | 'products' | 'categories' | 'colors' | 'reviews' | 'settings'

  const slugToRoute: Record<SlugKey, (id: number) => string> = {
    '': $routes.store_admin_id,
    products: $routes.store_admin_products,
    categories: $routes.store_admin_categories,
    colors: $routes.store_admin_colors,
    reviews: $routes.store_admin_reviews,
    settings: $routes.store_admin_settings,
  }

  const to = computed(() => slugToRoute[props.slug as SlugKey]?.(props.id) ?? `/store/${props.id}/${props.slug}`)
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm"
    active-class="bg-blue-200/30 text-blue-600 shadow-sm"
  >
    <font-awesome-icon :icon="icon" />
    {{ title }}
  </NuxtLink>
</template>
