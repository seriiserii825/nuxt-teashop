<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const slots = useSlots()
  const isDropdown = computed(() => !!slots.children)
  const isOpen = ref(false)
</script>

<template>
  <!-- Dropdown -->
  <div v-if="isDropdown">
    <button
      class="flex w-full items-center gap-3 rounded-lg px-3 py-2"
      :class="active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
      @click="isOpen = !isOpen"
    >
      <slot name="icon"></slot>
      <span class="flex-1 text-left font-medium">{{ label }}</span>
      <svg
        class="h-4 w-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div v-show="isOpen" class="ml-4 mt-1 space-y-1">
      <slot name="children"></slot>
    </div>
  </div>

  <!-- Link -->
  <NuxtLink
    v-else
    :to="to"
    class="flex items-center gap-3 rounded-lg px-3 py-2"
    :class="active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
  >
    <slot name="icon"></slot>
    <span class="font-medium">{{ label }}</span>
  </NuxtLink>
</template>
