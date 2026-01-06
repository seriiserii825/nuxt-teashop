<script setup lang="ts">
  const route = useRoute()
  const id = 'id' in route.params ? (route.params.id as string) : ''
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <div class="w-64 lg:hidden">
      <StoreNavigation :id="id" />
    </div>
    <div class="w-full">
      <StoreHeader />
      <slot></slot>
    </div>
  </div>
</template>
