<script setup lang="ts"></script>

<template>
  <!-- ProductSlider -->
  <div>
    <!-- Main Product Image -->
    <div class="mb-4 rounded-2xl bg-gray-100 p-8">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
        alt="Nike Flex Experience Run 11"
        class="h-auto w-full object-contain"
      />
    </div>

    <!-- Thumbnail Images -->
    <div class="flex gap-4">
      <button
        class="rounded-xl border-2 border-gray-900 bg-gray-100 p-4 transition hover:border-blue-600"
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
          alt="Nike Flex Experience Run 11"
          class="h-24 w-24 object-contain"
        />
      </button>
      <button
        class="rounded-xl border-2 border-gray-200 bg-gray-100 p-4 transition hover:border-blue-600"
      >
        <img
          src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200"
          alt="Nike Flex Experience Run 11"
          class="h-24 w-24 object-contain"
        />
      </button>
    </div>
  </div>
</template>
