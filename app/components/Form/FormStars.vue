<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    modelValue: string
    value: string
    name: string
    disabled?: boolean
    count: number
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (val: string) => {
      emit('update:modelValue', val)
    },
  })
</script>

<template>
  <label
    class="flex cursor-pointer items-center rounded p-2 transition hover:bg-gray-50"
  >
    <input
      v-model="model"
      type="radio"
      :name="name"
      :value="value"
      class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
    />
    <span class="ml-3 flex items-center">
      <IconIStar v-for="i in 5" :key="i" :active="i <= count" />
      <span class="ml-2 text-gray-700">and higher</span>
    </span>
  </label>
</template>
