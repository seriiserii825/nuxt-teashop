<script setup lang="ts">
  definePageMeta({
    layout: 'store',
  })
</script>

<template>
  <div class="p-4">
    <Heading
      title="Products"
      description="All shop products"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="console.log('Create product')"
    />
  </div>
</template>
