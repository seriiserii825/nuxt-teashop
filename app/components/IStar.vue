<script setup lang="ts">
  interface Props {
    active?: boolean
  }

  withDefaults(defineProps<Props>(), {
    active: false,
  })
</script>

<template>
  <svg
    class="h-4 w-4 fill-current"
    :class="{ 'text-gray-400': !active, 'text-yellow-400': active }"
    viewBox="0 0 20 20"
  >
    <path
      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
    />
  </svg>
</template>
