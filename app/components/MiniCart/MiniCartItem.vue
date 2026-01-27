<script setup lang="ts"></script>

<template>
  <div class="mb-6 flex gap-4">
    <!-- Product Image -->
    <div class="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-100 p-2">
      <img
        src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200"
        alt="Jordan Flight Essentials"
        class="h-full w-full object-contain"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1">
      <h3 class="mb-1 font-semibold text-gray-900">Jordan Flight Essentials</h3>
      <p class="mb-3 text-sm text-gray-600">2 399 ₽</p>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-3">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
        >
          <IconIMinus />
        </button>
        <span class="min-w-[20px] text-center font-medium text-gray-900"
          >1</span
        >
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
        >
          <IconIPlus />
        </button>
      </div>
    </div>
  </div>
</template>
