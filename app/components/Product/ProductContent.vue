<script setup lang="ts"></script>

<template>
  <!-- ProductContent -->
  <div>
    <h1 class="mb-4 text-4xl font-bold text-gray-900">
      Nike Flex Experience Run 11
    </h1>
    <p class="mb-8 text-3xl font-bold text-gray-900">4 999 ₽</p>

    <div class="mb-6 border-t border-gray-200 pt-6">
      <p class="mb-8 leading-relaxed text-gray-700">
        Комфортно, как и должен быть каждый забег. В кроссовках Nike Flex
        Experience Run 11 мы создали легкий, чистый дизайн, который выглядит так
        же хорошо, как и ощущается. Эти кроссовки поддерживают стопу во всех
        нужных местах, а движения в них настолько естественны, что вы
        поклянетесь, будто носите их годами.
      </p>

      <!-- Color -->
      <div class="mb-6">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Цвет:</span>
          <div
            class="h-8 w-8 rounded-full border-2 border-gray-300 bg-black"
          ></div>
        </div>
      </div>

      <!-- Category -->
      <div class="mb-6">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Категория:</span>
          <span class="text-gray-700">Обувь</span>
        </div>
      </div>

      <!-- Rating -->
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Средний рейтинг:</span>
          <div class="flex items-center gap-1">
            <svg
              class="h-5 w-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <span class="text-gray-700">4.0 | 1 отзыв</span>
          </div>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition duration-200 hover:bg-blue-700 hover:shadow-xl"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>
