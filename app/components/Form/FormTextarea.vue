<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    focus: {
      type: Boolean,
      required: false,
      default: false,
    },
    rows: {
      type: Number,
      required: false,
      default: 4,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const textareaRef = ref<HTMLTextAreaElement | null>(null)

  const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  })

  onMounted(() => {
    if (props.focus && textareaRef.value) {
      textareaRef.value.focus()
    }
  })
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <textarea
      :id="name"
      ref="textareaRef"
      v-model="value"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border-gray-300 bg-transparent text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    ></textarea>
  </div>
</template>
