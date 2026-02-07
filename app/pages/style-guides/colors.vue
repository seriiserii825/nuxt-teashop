<script setup lang="ts">
  definePageMeta({
    layout: 'style-guides',
  })
</script>

<template>
  <div>
    <Breadcrumbs
      :items="[
        { label: 'Home', to: '/style-guides/components' },
        { label: 'Colors' },
      ]"
    />
    <StColorsComponent />
  </div>
</template>
