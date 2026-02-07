<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core'

  import { computed, ref, watch } from 'vue'

  const emitDebounced = useDebounceFn(
    (value: [number, number]) => {
      emit('update:modelValue', value)
    },
    300 // ms
  )

  interface Props {
    modelValue?: [number, number]
    min?: number
    max?: number
    step?: number
    currency?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [0, 500000],
    min: 0,
    max: 500000,
    step: 1000,
    currency: '₽',
  })

  const emit = defineEmits<{
    'update:modelValue': [value: [number, number]]
  }>()

  const minValue = ref(props.modelValue[0])
  const maxValue = ref(props.modelValue[1])

  // Sync local refs when parent changes modelValue (e.g., reset)
  watch(
    () => props.modelValue,
    (newValue) => {
      minValue.value = newValue[0]
      maxValue.value = newValue[1]
    }
  )

  const minPercent = computed(
    () => ((minValue.value - props.min) / (props.max - props.min)) * 100
  )
  const maxPercent = computed(
    () => ((maxValue.value - props.min) / (props.max - props.min)) * 100
  )

  watch([minValue, maxValue], ([newMin, newMax]) => {
    // Проверка границ
    if (newMin > newMax) {
      setTimeout(() => {
        minValue.value = newMax
      }, 500)
    }
    if (newMax < newMin) {
      setTimeout(() => {
        maxValue.value = newMin
      }, 500)
    }

    // emit('update:modelValue', [minValue.value, maxValue.value])
    emitDebounced([newMin, newMax])
  })
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-3">
      <div class="relative w-full">
        <input
          v-model.number="minValue"
          type="number"
          placeholder="От"
          :min="min"
          :max="max"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-0 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {{ currency }}
        </span>
      </div>
      <div class="relative w-full">
        <input
          v-model.number="maxValue"
          type="number"
          placeholder="До"
          :min="min"
          :max="max"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-0 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {{ currency }}
        </span>
      </div>
    </div>

    <div class="relative px-2 py-4">
      <div class="relative h-2 rounded-lg bg-gray-200">
        <div
          class="absolute top-0 h-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
          :style="{
            left: minPercent + '%',
            right: 100 - maxPercent + '%',
          }"
        ></div>
      </div>

      <input
        v-model.number="minValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
      />
      <input
        v-model.number="maxValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range-slider absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
      />
    </div>
  </div>
</template>

<style scoped>
  .range-slider::-webkit-slider-thumb {
    position: relative;
    top: 10px;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 3px solid #06b6d4;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 10;
    transition: all 0.2s ease;
  }

  .range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 3px solid #06b6d4;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 10;
    transition: all 0.2s ease;
  }

  .range-slider::-webkit-slider-runnable-track {
    background: transparent;
    height: 8px;
  }

  .range-slider::-moz-range-track {
    background: transparent;
    height: 8px;
  }

  .range-slider:hover::-webkit-slider-thumb {
    transform: scale(1.1);
    border-color: #0891b2;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  .range-slider:hover::-moz-range-thumb {
    transform: scale(1.1);
    border-color: #0891b2;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  .range-slider:focus {
    outline: none;
  }

  .range-slider:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
    border-color: #0891b2;
  }

  .range-slider:focus::-moz-range-thumb {
    box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
    border-color: #0891b2;
  }

  .range-slider:active::-webkit-slider-thumb {
    transform: scale(0.95);
  }

  .range-slider:active::-moz-range-thumb {
    transform: scale(0.95);
  }
</style>
