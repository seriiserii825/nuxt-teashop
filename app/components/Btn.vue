<script setup lang="ts">
  const emits = defineEmits(['emit_click'])
  defineProps({
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button',
    },
    variant: {
      // Changed from 'class' to 'variant'
      type: String as () =>
        | 'btn-danger'
        | 'btn-success'
        | 'btn-warning'
        | 'btn-info',
      default: 'btn-info',
    },
  })

  function onClick(event: Event) {
    emits('emit_click', event)
  }
</script>

<template>
  <button :type="type" :class="`btn ${variant}`" @click="onClick">
    <slot ></slot>
  </button>
</template>
