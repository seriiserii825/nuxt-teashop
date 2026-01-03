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
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: '',
    },
    focus: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const categoryInputRef = ref<HTMLInputElement | null>(null)

  const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  })

  onMounted(() => {
    if (props.focus && categoryInputRef.value) {
      categoryInputRef.value.focus()
    }
  })
</script>

<template>
  <div>
    <label v-if="label" :for="name" class="label">
      {{ label }}
    </label>
    <input
      :id="name"
      ref="categoryInputRef"
      v-model="value"
      :name="name"
      :type="type"
      class="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      :placeholder="placeholder"
    />
  </div>
</template>
