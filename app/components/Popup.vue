<script setup lang="ts">
  const emits = defineEmits(['emit_close'])
  defineProps({
    title: { type: String, required: false, default: 'Popup' },
    width: { type: String, required: false, default: '600px' },
  })
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition"
      @click="emits('emit_close')"
    ></div>
    <div
      :class="`relative z-10 w-[${width}] rounded-lg bg-slate-800 p-6 shadow-lg`"
    >
      <header
        class="mb-4 flex items-center justify-between border-b border-slate-700 pb-2"
      >
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <font-awesome-icon
          class="trasition-color cursor-pointer text-slate-400 hover:text-white"
          icon="fa-solid fa-square-xmark"
          @click="$emit('emit_close')"
        />
      </header>
      <slot ></slot>
    </div>
  </div>
</template>
