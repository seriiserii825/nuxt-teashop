<script setup lang="ts">
  const emits = defineEmits(['emit_click'])
  defineProps({
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button',
    },
    variant: {
      type: String as () =>
        | 'btn-danger'
        | 'btn-success'
        | 'btn-warning'
        | 'btn-info'
        | 'btn-outline',
      default: 'btn-info',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  function onClick(event: Event) {
    emits('emit_click', event)
  }
</script>

<template>
  <button
    :disabled="loading"
    :type="type"
    :class="`btn ${variant}`"
    @click="onClick"
  >
    <Preloader v-if="loading" class="mr-2 h-4 w-4" />
    <slot></slot>
  </button>
</template>
