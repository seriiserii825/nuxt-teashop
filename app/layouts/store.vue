<script setup lang="ts">
  const route = useRoute()
  const id = 'id' in route.params ? (route.params.id as string) : ''
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <div class="w-64">
      <StoreNavigation :id="id" />
    </div>
    <slot></slot>
  </div>
</template>
