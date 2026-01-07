<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
</script>

<template>
  <div class="min-h-screen bg-white p-8 lg:p-4">
    <Heading title="Statistics" />
    <div class="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
      <Card
        title="Total Sales"
        :icon="['fas', 'dollar-sign']"
        :count="useFormatPrice(1589)"
      />
      <Card title="Products" :icon="['fab', 'product-hunt']" :count="24" />
      <Card title="Categories" :icon="['fas', 'icons']" :count="7" />
      <Card title="Colors" :icon="['fas', 'brush']" :count="14" />
      <Card title="Reviews" :icon="['fas', 'chart-simple']" :count="43" />
      <Card title="Rating" :icon="['fas', 'star-half-stroke']" :count="5" />
    </div>
  </div>
</template>
