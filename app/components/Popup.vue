<script setup lang="ts">
  const emits = defineEmits(['emit_close'])
  defineProps({
    title: { type: String, required: false, default: 'Popup' },
    width: { type: String, default: 'w-[600px]' },
  })
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-gray-500/50 backdrop-blur-sm transition"
      @click="emits('emit_close')"
    ></div>
    <div :class="[width, 'z-10 rounded-lg bg-white p-6 shadow-lg md:w-[90%]']">
      <header
        class="mb-4 flex items-center justify-between border-b border-gray-200 pb-2"
      >
        <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
        <font-awesome-icon
          class="cursor-pointer text-gray-400 transition-colors hover:text-gray-700"
          icon="fa-solid fa-square-xmark"
          @click="$emit('emit_close')"
        />
      </header>
      <slot></slot>
    </div>
  </div>
</template>
