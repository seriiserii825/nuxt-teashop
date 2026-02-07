<script setup lang="ts">
  import StStylePopup from './StStylePopup.vue'

  const is_visible_popup = ref(false)

  onMounted(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        is_visible_popup.value = true
      }
    }

    window.addEventListener('keydown', onKeydown)

    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('keydown', onKeydown)
    })
  })
</script>

<template>
  <div class="style-button">
    <!-- Style Guides floating button -->
    <div class="fixed right-4 top-1/2 z-50 -translate-y-1/2">
      <button
        class="flex items-center gap-2 rounded-lg border bg-white px-2 py-2 shadow-lg transition hover:bg-gray-50"
        @click="is_visible_popup = true"
      >
        <span
          class="flex-column group flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 font-bold text-blue-600"
        >
          <span class="group-hover:hidden"> 🎨 </span>
          <span class="hidden group-hover:block">ctrl+k</span>
        </span>
      </button>
    </div>
    <StStylePopup
      v-if="is_visible_popup"
      @emit_close="is_visible_popup = false"
    />
  </div>
</template>
