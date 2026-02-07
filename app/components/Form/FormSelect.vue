<script setup lang="ts">
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const emits = defineEmits(['update:modelValue'])

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array as PropType<ISelectOption[]>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: '',
    },
  })

  const value = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val),
  })
</script>

<template>
  <label class="grid">
    <span class="text-gray-700 font-medium mb-2">{{ label }}</span>
    <select
      :id="name"
      v-model="value"
      :name="name"
      :required="required"
      class="cursor-pointer border-gray-300 bg-white text-gray-900"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>
