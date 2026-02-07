<script setup lang="ts">
  import type { PropType } from 'vue'

  const emits = defineEmits(['emit-close'])

  defineProps({
    hasCloseIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
    position: {
      type: String as PropType<'left' | 'right'>,
      required: false,
      default: 'left',
    },
  })

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
  <div
    class="fixed left-0 top-0 z-10 flex h-full w-full"
    :class="{
      'justify-start': position === 'left',
      'justify-end': position === 'right',
    }"
  >
    <div
      class="relative z-20 h-full w-96 transition-transform duration-500 ease-out"
      :class="{
        'translate-x-0': is_drawer_visible,
        '-translate-x-full': !is_drawer_visible && position === 'left',
        'translate-x-full': !is_drawer_visible && position === 'right',
      }"
    >
      <div class="h-full border-r border-neutral-200 bg-neutral-50 p-8 sm:p-4">
        <slot :close="close"></slot>
      </div>
    </div>
    <div
      class="absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-black/50"
      @click="close"
    ></div>

    <font-awesome-icon
      v-if="hasCloseIcon"
      :icon="['fas', 'bars']"
      class="absolute right-8 top-8 z-20 cursor-pointer text-xl text-white"
      @click="close"
    />
  </div>
</template>
