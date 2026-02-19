<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import type { IProduct } from '~/interfaces/IProduct'

  const loading = ref(false)
  const search = ref('')
  const open = ref(false)
  const results = ref<IProduct[]>([])

  function closePopup() {
    open.value = false
    search.value = ''
    results.value = []
  }

  const onSearch = async () => {
    if (search.value.trim() === '') {
      results.value = []
      open.value = false
      return
    }
    loading.value = true
    if (!search.value.trim()) {
      results.value = []
      return
    }

    try {
      const data = await productService.searchProducts(search.value)
      results.value = data
      open.value = true
    } catch (error) {
      handleAxiosError(error)
    } finally {
      loading.value = false
    }
  }

  const { debouncedFn: debouncedSearch } = useDebounce(() => {
    onSearch()
  }, 500)

  onMounted(() => {
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      if (target && !target.closest('.relative')) open.value = false
    })
  })
</script>

<template>
  <div class="mx-8 max-w-2xl flex-1">
    <div class="relative w-full">
      <div class="relative">
        <!-- Search input -->
        <input
          v-model="search"
          type="text"
          placeholder="Поиск товаров"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          @focus="open = true"
          @input="debouncedSearch()"
        />
        <Preloader
          v-if="loading"
          class="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Popup -->
      <div
        v-if="open && search"
        class="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
      >
        <!-- Results -->
        <ul v-if="results.length" class="max-h-96 overflow-y-auto">
          <ProductSearched
            v-for="item in results"
            :key="item.id"
            :product="item"
            @emit_close_popup="closePopup"
          />
        </ul>

        <!-- Empty state -->
        <div
          v-else-if="!loading"
          class="px-4 py-6 text-center text-sm text-gray-500"
        >
          Not found any products matching "<span
            class="font-semibold text-gray-900"
            >{{ search }}</span
          >"
        </div>
      </div>
    </div>
  </div>
</template>
