<script setup lang="ts">
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const emits = defineEmits(['update:modelValue', 'closeDropdown'])

  const props = defineProps({
    buttonLabel: {
      type: String,
      required: false,
      default: 'Create new shop',
    },
    groupLabel: {
      type: String,
      required: false,
      default: 'Shops',
    },
    icon: {
      type: Array as PropType<string[]>,
      required: true,
    },
    options: {
      type: Array as PropType<ISelectOption[]>,
      required: false,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: '',
    },
  })

  const value = computed({
    get: () => props.modelValue,
    set: (val) => {
      emits('update:modelValue', val)
      is_dropdown_opened.value = false
    },
  })

  const is_dropdown_opened = ref(false)

  function clickHandler() {
    emits('closeDropdown')
    is_dropdown_opened.value = false
  }

  const label = computed(() => {
    return (
      props.options.find((option) => option.value === value.value)?.text ||
      'Select'
    )
  })
</script>

<template>
  <div class="form-select-complex relative w-48">
    <div
      class="flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 p-2 hover:border-gray-400"
      @click="is_dropdown_opened = !is_dropdown_opened"
    >
      <font-awesome-icon :icon="icon" class="text-gray-500" />
      <span class="font-medium text-gray-700">
        {{ label }}
      </span>
    </div>
    <Transition name="fade-up">
      <div
        v-if="is_dropdown_opened"
        class="absolute left-0 top-12 w-full rounded-md border border-gray-300 bg-white p-2"
      >
        <h3
          class="border-b border-gray-200 pb-1 text-sm font-medium text-gray-700"
        >
          {{ groupLabel }}
        </h3>
        <ul
          v-if="options && options.length"
          class="border-b border-gray-200 pb-1"
        >
          <li
            v-for="(option, index) in options"
            :key="option.value"
            :tabindex="index"
            class="mt-2 cursor-pointer rounded-md py-2 hover:bg-gray-100"
            @click="value = option.value"
          >
            <span
              :class="{
                'font-semibold text-blue-600': value === option.value,
                'text-gray-700': value !== option.value,
              }"
            >
              <font-awesome-icon :icon="icon" class="text-gray-500" />
              {{ option.text }}
            </span>
          </li>
        </ul>
        <button class="pb-1 pt-3" :tabindex="99" @click="clickHandler">
          <font-awesome-icon :icon="['fas', 'plus']" class="text-gray-500" />
          <span class="ml-1 text-sm text-gray-600">{{ buttonLabel }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: all 0.2s ease;
  }
  .fade-up-enter-from,
  .fade-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
