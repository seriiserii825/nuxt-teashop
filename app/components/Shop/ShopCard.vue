<script setup lang="ts"></script>

<template>
  <div class="group cursor-pointer">
    <div
      class="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div
        class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400"
      >
        <img
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop"
          alt="Велосипеды"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>
        <!-- Status Badge -->
        <div class="absolute right-4 top-4">
          <span
            class="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white"
            >Активен</span
          >
        </div>
      </div>
      <!-- Content -->
      <div class="p-6">
        <h3 class="mb-2 text-2xl font-bold text-gray-900">Велосипеды</h3>
        <p class="mb-4 text-gray-600">
          Профессиональные велосипеды и аксессуары для всей семьи
        </p>
        <!-- Stats -->
        <div class="mb-4 flex items-center justify-between text-sm">
          <div class="flex items-center text-gray-500">
            <svg
              class="mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>156 товаров</span>
          </div>
          <div class="flex items-center text-gray-500">
            <svg
              class="mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span>45 заказов</span>
          </div>
        </div>
        <!-- Action Button -->
        <button
          class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Управлять магазином
          <svg
            class="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
