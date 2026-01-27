<script setup lang="ts"></script>

<template>
  <!-- ProductReviews -->
  <div>
    <h2 class="mb-8 text-3xl font-bold text-gray-900">Отзывы</h2>

    <!-- Review Card -->
    <div class="max-w-md rounded-2xl border border-gray-200 bg-white p-6">
      <div class="flex items-start gap-4">
        <!-- Avatar -->
        <div
          class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-400"
        >
          <svg
            class="h-8 w-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Review Content -->
        <div class="flex-1">
          <h3 class="mb-2 font-semibold text-gray-900">Олег</h3>

          <!-- Star Rating -->
          <div class="mb-3 flex gap-1">
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg class="h-5 w-5 fill-current text-gray-300" viewBox="0 0 20 20">
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
          </div>

          <p class="text-gray-700">Очень удобно</p>
        </div>
      </div>
    </div>
  </div>
</template>
