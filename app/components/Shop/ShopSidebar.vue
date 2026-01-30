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

  const priceRange = ref<[number, number]>([0, 500000])

  const selectedCategoriesCheckbox = ref<string[]>([])

  type ICategoryCheckbox = {
    value: string
    label: string
  }

  const categoriesCheckboxes = ref<ICategoryCheckbox[]>([])

  const selectedStars = ref<string[]>([])

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
        <FormCheckboxGroup
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
        <FormStars v-model="selectedStars" :count="5" name="rating" value="5" />
        <FormStars v-model="selectedStars" :count="4" name="rating" value="4" />
        <FormStars v-model="selectedStars" :count="3" name="rating" value="3" />
      </div>
    </div>

    <!-- Цена -->
    <div class="mb-8 border-b border-gray-200 pb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Цена</h3>
      <FormFromRangePrice
        v-model="priceRange"
        :min="0"
        :max="500000"
        :step="1000"
        currency="$"
      />
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
