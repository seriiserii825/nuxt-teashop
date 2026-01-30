<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    modelValue: string[]
    label: string
    value: string
    name: string
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string[] | number[]]
  }>()

  const checked = computed({
    get: () => props.modelValue.includes(props.value),
    set: (isChecked: boolean) => {
      if (isChecked) {
        emit('update:modelValue', [...props.modelValue, props.value])
      } else {
        emit(
          'update:modelValue',
          props.modelValue.filter((v) => v !== props.value)
        )
      }
    },
  })
</script>

<template>
  <label
    class="flex cursor-pointer items-center rounded p-2 transition"
    :class="[disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50']"
  >
    <input
      v-model="checked"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed"
    />
    <span class="ml-3 text-gray-700">{{ label }}</span>
  </label>
</template>
