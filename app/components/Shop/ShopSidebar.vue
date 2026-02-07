<script setup lang="ts">
  import type { LocationQueryValue } from 'vue-router'

  import type { PropType } from 'vue'

  import type { ICategoryWithProductsCount } from '~/interfaces/ICategory'
  import type { IColor } from '~/interfaces/IColor'

  const props = defineProps({
    categories: {
      type: Array as PropType<ICategoryWithProductsCount[]>,
      required: false,
      default: () => [],
    },
    colors: {
      type: Array as PropType<IColor[]>,
      required: false,
      default: () => [],
    },
  })

  const route = useRoute()

  // Утилиты для работы с query параметрами
  const queryUtils = {
    toArray(
      param: LocationQueryValue | LocationQueryValue[] | undefined
    ): string[] {
      if (!param) return []
      if (Array.isArray(param)) {
        return param.filter((v): v is string => typeof v === 'string')
      }
      return [param]
    },

    toNumber(
      param: LocationQueryValue | LocationQueryValue[] | undefined,
      defaultValue: number
    ): number {
      if (!param || Array.isArray(param)) return defaultValue
      const num = Number(param)
      return isNaN(num) ? defaultValue : num
    },

    toString(
      param: LocationQueryValue | LocationQueryValue[] | undefined
    ): string | null {
      if (!param || Array.isArray(param)) return null
      return typeof param === 'string' ? param : null
    },
  }

  // Инициализация из URL
  const priceRange = ref<[number, number]>([
    queryUtils.toNumber(route.query.priceMin, 0),
    queryUtils.toNumber(route.query.priceMax, 500000),
  ])

  const selectedCategoriesCheckbox = ref<string[]>(
    route.query.category_ids
      ? String(route.query.category_ids).split(',').filter(Boolean)
      : []
  )

  const selectedStars = ref<string>((route.query.stars as string) || '')

  const selectedColors = ref<string | null>(
    queryUtils.toString(route.query.colors)
  )

  type ICategoryCheckbox = {
    value: string
    label: string
    count?: number
  }

  const categoriesCheckboxes = ref<ICategoryCheckbox[]>([])

  // Функция обновления URL
  const updateURL = () => {
    const query: Record<string, string> = {}

    if (priceRange.value[0] !== 0) query.priceMin = String(priceRange.value[0])
    if (priceRange.value[1] !== 500000)
      query.priceMax = String(priceRange.value[1])

    if (selectedCategoriesCheckbox.value.length > 0) {
      query.category_ids = selectedCategoriesCheckbox.value.join(',') // ✅ ВАЖНО
    }

    if (selectedStars.value) query.stars = selectedStars.value
    if (selectedColors.value) query.colors = selectedColors.value

    navigateTo({ path: route.path, query }, { replace: true }) // чтобы не засорять history
  }

  watch(
    [priceRange, selectedCategoriesCheckbox, selectedStars, selectedColors],
    () => {
      updateURL()
    },
    { deep: true }
  )

  function selectColor(index: number) {
    const colorId = props.colors[index]?.id.toString()
    if (!colorId) return

    selectedColors.value = selectedColors.value === colorId ? null : colorId
  }

  const resetFilters = () => {
    priceRange.value = [0, 500000]
    selectedCategoriesCheckbox.value = []
    selectedStars.value = ''
    selectedColors.value = null
  }

  const applyFilters = () => {
    console.log('Applied filters:', {
      priceRange: priceRange.value,
      categories: selectedCategoriesCheckbox.value,
      stars: selectedStars.value,
      colors: selectedColors.value,
    })
  }

  onMounted(() => {
    categoriesCheckboxes.value = props.categories.map((category) => ({
      value: category.id.toString(),
      label: category.title,
      count: category.products_count,
    }))
  })
</script>

<template>
  <aside class="h-screen overflow-y-auto border-r border-gray-200 bg-white p-6">
    <!-- Категории -->
    <div class="mb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Categories</h3>
      <div class="space-y-2">
        <FormCheckboxGroup
          v-for="category in categoriesCheckboxes"
          :key="category.value"
          v-model="selectedCategoriesCheckbox"
          name="categories"
          :count="category.count"
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
    <div v-if="colors" class="mb-8">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Цвет</h3>
      <div class="grid grid-cols-5 gap-3">
        <button
          v-for="(color, index) in colors"
          :key="color.id"
          class="h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-800 transition hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          :class="{
            'border-cyan-500':
              selectedColors && selectedColors.includes(color.id.toString()),
          }"
          :style="{ backgroundColor: color.value }"
          @click="selectColor(index)"
        ></button>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="space-y-3">
      <button
        class="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-medium text-white transition hover:bg-cyan-600"
        @click="applyFilters"
      >
        Apply Filters
      </button>
      <button
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
        @click="resetFilters"
      >
        Reset Filters
      </button>
    </div>
  </aside>
</template>
