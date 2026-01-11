<script setup lang="ts">
  import type { PropType } from 'vue'

  defineEmits(['btn_click'])

  defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Add New',
    },
    icon: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  })
</script>

<template>
  <div class="flex items-start justify-between">
    <div>
      <h2 class="mb-4 text-2xl font-bold">
        {{ title }}
      </h2>
      <p v-if="description" class="mb-6 text-gray-600">
        {{ description }}
      </p>
    </div>
    <Btn v-if="buttonText" variant="btn-info" @click="$emit('btn_click')">
      <font-awesome-icon v-if="icon.length" :icon="icon" />
      {{ buttonText }}</Btn
    >
  </div>
</template>
