<script setup lang="ts">
  const emits = defineEmits(['emit-close'])

  const is_drawer_visible = ref(false)
  function close() {
    is_drawer_visible.value = false
    setTimeout(() => {
      emits('emit-close')
    }, 300)
  }
  onMounted(() => {
    // drawer появляется после overlay
    setTimeout(() => {
      is_drawer_visible.value = true
    }, 200)
  })
</script>

<template>
  <div class="fixed left-0 top-0 z-10 h-full w-full bg-black/50">
    <!-- drawer с отдельной анимацией -->
    <div
      class="h-full w-64 transition-transform duration-500 ease-out"
      :class="is_drawer_visible ? 'translate-x-0' : '-translate-x-full'"
    >
      <slot></slot>
    </div>

    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="absolute right-8 top-8 text-xl text-white"
      @click="close"
    />
  </div>
</template>
