<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
</script>

<template>
  <div class="min-h-screen bg-white p-8 lg:p-4">
    <Heading title="Statistics" />
    <StatisticCards />
    <CardBig class="mt-8" title="Customers" :icon="['fas', 'chart-line']">
      <Customers />
    </CardBig>
  </div>
</template>
