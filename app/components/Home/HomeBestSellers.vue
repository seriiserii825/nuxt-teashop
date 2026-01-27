<script setup lang="ts"></script>

<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <FrontHeaders
        title="Bestsellers"
        text="The most popular products in our store."
        link-text="Find out more"
      />
      <!-- Product Grid -->
      <div
        class="xl:grid-cols-6 grid grid-cols-6 gap-6 lg:grid-cols-3 sm:grid-cols-2"
      >
        <!-- Product Card 1 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
              alt="Apple MacBook Pro"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">Apple MacBook Pro</h3>
            <p class="mb-2 text-sm text-gray-500">Ноутбуки</p>
            <p class="text-lg font-bold text-gray-900">189 999 ₽</p>
          </div>
        </div>

        <!-- Product Card 2 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
              alt="Nike Club"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">Nike Club</h3>
            <p class="mb-2 text-sm text-gray-500">Шорты</p>
            <p class="text-lg font-bold text-gray-900">3 899 ₽</p>
          </div>
        </div>

        <!-- Product Card 3 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
              alt="Ноутбук MSI Modern 15"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">
              Ноутбук MSI Modern 15
            </h3>
            <p class="mb-2 text-sm text-gray-500">Ноутбуки</p>
            <p class="text-lg font-bold text-gray-900">59 999 ₽</p>
          </div>
        </div>

        <!-- Product Card 4 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
              alt="Samsung Galaxy Z Fold5"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">
              Samsung Galaxy Z Fold5
            </h3>
            <p class="mb-2 text-sm text-gray-500">Телефоны</p>
            <p class="text-lg font-bold text-gray-900">169 999 ₽</p>
          </div>
        </div>

        <!-- Product Card 5 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1678652197753-eb1b83fe0ff7?w=400"
              alt="iPhone 15 Pro Max 256GB"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">
              iPhone 15 Pro Max 256GB
            </h3>
            <p class="mb-2 text-sm text-gray-500">Телефоны</p>
            <p class="text-lg font-bold text-gray-900">114 000 ₽</p>
          </div>
        </div>

        <!-- Product Card 6 -->
        <div
          class="group overflow-hidden rounded-2xl bg-gray-50 transition duration-300 hover:shadow-xl"
        >
          <div
            class="flex aspect-square items-center justify-center bg-gray-100 p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
              alt="Nike Flex Experience Run"
              class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <h3 class="mb-1 font-semibold text-gray-900">
              Nike Flex Experience Run...
            </h3>
            <p class="mb-2 text-sm text-gray-500">Обувь</p>
            <p class="text-lg font-bold text-gray-900">4 999 ₽</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
