<script setup lang="ts">
  const store_id = useIdParamFromUrl('store_id')
  console.log('store_id', store_id)
</script>

<template>
  <section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Products Catalog"
        text="Explore our wide range of products."
      />
      <div class="flex items-start gap-8">
        <ShopSidebar class="w-64 flex-shrink-0 md:w-full" />
        <ProductGrid class="flex-1" />
      </div>
    </div>
  </section>
</template>
