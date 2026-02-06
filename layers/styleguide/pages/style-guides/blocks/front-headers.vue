<script setup lang="ts">
  definePageMeta({
    layout: 'style-guides',
  })
</script>

<template>
  <div>
    <Breadcrumbs
      :items="[
        { label: 'Home', to: '/style-guides' },
        { label: 'FrontHeaders' },
      ]"
    />
    <!-- TODO: Create a FrontHeaders component and use it here to display a title and description for this page. -->
    <StInputsComponent />
  </div>
</template>
