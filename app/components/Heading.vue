<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div class="mb-4 text-2xl font-bold">
    {{ title }}
  </div>
</template>
