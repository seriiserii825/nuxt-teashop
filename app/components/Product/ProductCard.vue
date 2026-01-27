<script setup lang="ts"></script>
<template>
  <div
    class="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200 transition duration-300 hover:ring-2 hover:ring-blue-400"
  >
    <!-- Image Container -->
    <NuxtLink
      to="/product/123"
      class="relative block aspect-square overflow-hidden bg-gray-50"
    >
      <img
        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
        alt="Apple MacBook Pro"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
      ></div>
      <div
        class="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <NuxtLink
          to="/product/123"
          class="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-gray-50"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>View</span>
        </NuxtLink>
        <button
          class="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          <svg
            class="h-4 w-4"
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
          <span>Cart</span>
        </button>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="p-6">
      <p class="mb-2 text-sm text-gray-500">Ноутбуки</p>
      <NuxtLink to="/product/123">
        <h3
          class="mb-3 text-xl font-bold text-gray-900 transition hover:text-blue-600"
        >
          Apple MacBook Pro
        </h3>
      </NuxtLink>

      <!-- Rating -->
      <div class="mb-4 flex items-center gap-2">
        <div class="flex items-center gap-0.5">
          <svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
          <svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
          <svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
          <svg class="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
          <svg class="h-4 w-4 fill-gray-300" viewBox="0 0 20 20">
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        </div>
        <span class="text-sm text-gray-500">(48)</span>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-2xl font-bold text-blue-600">189 999 ₽</p>
        <button class="text-gray-400 transition hover:text-red-500">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
