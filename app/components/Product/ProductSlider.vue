<script setup lang="ts">
  const props = defineProps({
    images: {
      type: Array as () => string[],
      required: true,
    },
  })

  const current_index = ref(0)

  function goToIndex(index: number) {
    if (index >= 0 && index < props.images.length) {
      current_index.value = index
    }
  }
</script>

<template>
  <!-- ProductSlider -->
  <div>
    <!-- Main Product Image -->
    <div class="mb-4 rounded-2xl bg-gray-100 p-8">
      <img
        v-if="images.length > 0"
        :src="userGetServerUrl(images[current_index])"
        alt="Nike Flex Experience Run 11"
        class="h-auto w-full object-contain"
      />
    </div>

    <!-- Thumbnail Images -->
    <div v-if="images.length > 1" class="flex gap-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="rounded-xl border-2 border-gray-900 bg-gray-100 p-4 opacity-50 transition hover:border-blue-600"
        :class="{
          'opacity-90': current_index === index,
        }"
      >
        <img
          :src="userGetServerUrl(image)"
          alt="Nike Flex Experience Run 11"
          class="h-24 w-24 object-contain"
          @click="goToIndex(index)"
        />
      </button>
    </div>
  </div>
</template>
