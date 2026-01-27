<script setup lang="ts">
  defineEmits(['emit-close'])
</script>

<template>
  <div>
    <!-- Cart Header -->
    <div class="border-b border-gray-200 px-6 py-5">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Корзина товаров</h2>
        <button
          class="text-gray-400 transition hover:text-gray-600"
          @click="$emit('emit-close')"
        >
          <IconIClose />
        </button>
      </div>
    </div>

    <!-- Empty Cart Content -->
    <div class="flex flex-1 items-center justify-center px-6">
      <div class="text-center">
        <div class="mb-4">
          <IconICart />
        </div>
        <p class="text-lg text-gray-600">Корзина пустая!</p>
      </div>
    </div>
  </div>
</template>
