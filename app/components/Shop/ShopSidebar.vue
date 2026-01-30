<script setup lang="ts">
  import type { PropType } from 'vue'

  import type { ICategory } from '~/interfaces/ICategory'
  import type { IColor } from '~/interfaces/IColor'

  const props = defineProps({
    categories: {
      type: Array as PropType<ICategory[]>,
      required: false,
      default: () => [],
    },
    colors: {
      type: Array as PropType<IColor[]>,
      required: false,
      default: () => [],
    },
  })

  const selectedCategoriesCheckbox = ref<string[]>([])

  type ICategoryCheckbox = {
    value: string
    label: string
  }

  const categoriesCheckboxes = ref<ICategoryCheckbox[]>([])
  onMounted(() => {
    categoriesCheckboxes.value = props.categories.map((category) => ({
      value: category.id.toString(),
      label: category.title,
    }))
  })
</script>

<template>
  <aside class="h-screen border-r border-gray-200 bg-white p-6">
    <!-- Категории -->
    <div class="mb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Categories</h3>
      <div class="space-y-2">
        <FormCheckbox
          v-for="category in categoriesCheckboxes"
          :key="category.value"
          v-model="selectedCategoriesCheckbox"
          name="categories"
          :value="category.value"
          :label="category.label"
        />
      </div>
    </div>

    <!-- Отзывы/Рейтинг -->
    <div class="mb-8 border-b border-gray-200 pb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Рейтинг</h3>
      <div class="space-y-2">
        <label
          class="flex cursor-pointer items-center rounded p-2 transition hover:bg-gray-50"
        >
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
          />
          <span class="ml-3 flex items-center">
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <span class="ml-2 text-gray-700">и выше</span>
          </span>
        </label>
        <label
          class="flex cursor-pointer items-center rounded p-2 transition hover:bg-gray-50"
        >
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
          />
          <span class="ml-3 flex items-center">
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg class="h-4 w-4 fill-current text-gray-300" viewBox="0 0 20 20">
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <span class="ml-2 text-gray-700">и выше</span>
          </span>
        </label>
        <label
          class="flex cursor-pointer items-center rounded p-2 transition hover:bg-gray-50"
        >
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
          />
          <span class="ml-3 flex items-center">
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg
              class="h-4 w-4 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg class="h-4 w-4 fill-current text-gray-300" viewBox="0 0 20 20">
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <svg class="h-4 w-4 fill-current text-gray-300" viewBox="0 0 20 20">
              <path
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
            <span class="ml-2 text-gray-700">и выше</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Цена -->
    <div class="mb-8 border-b border-gray-200 pb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Цена</h3>
      <div class="space-y-4">
        <div class="flex gap-3">
          <input
            type="number"
            placeholder="От"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="До"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <!-- Range Slider -->
        <div class="px-2">
          <input
            type="range"
            min="0"
            max="500000"
            value="250000"
            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-cyan-500"
          />
          <div class="mt-2 flex justify-between text-xs text-gray-500">
            <span>0 ₽</span>
            <span>500 000 ₽</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Цвет -->
    <div class="mb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Цвет</h3>
      <div class="grid grid-cols-5 gap-3">
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-800 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-400 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-white transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-blue-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-red-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-green-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-yellow-400 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-purple-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-pink-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
        <button
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-orange-500 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        ></button>
      </div>
    </div>
  </aside>
</template>
