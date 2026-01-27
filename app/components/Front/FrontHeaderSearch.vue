<script setup lang="ts"></script>

<template>
  <div class="mx-8 max-w-2xl flex-1 md:flex">
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Поиск товаров"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        class="absolute right-0 top-0 h-full rounded-r-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
