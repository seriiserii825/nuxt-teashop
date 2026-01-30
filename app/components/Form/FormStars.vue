<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    modelValue: string[]
    value: string
    name: string
    disabled?: boolean
    count: number
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
    class="flex cursor-pointer items-center rounded p-2 transition hover:bg-gray-50"
  >
    <input
      v-model="checked"
      type="checkbox"
      :name="name"
      :value="value"
      class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
    />
    <span class="ml-3 flex items-center">
      <IStar v-for="i in 5" :key="i" :active="i <= count" />
      <span class="ml-2 text-gray-700">и выше</span>
    </span>
  </label>
</template>
