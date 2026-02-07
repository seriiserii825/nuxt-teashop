<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    basePath: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: Array as PropType<readonly string[]>,
      required: false,
      default: () => ['fas', 'circle'],
    },
  })

  const route = useRoute()
  const slots = useSlots()
  const isDropdown = computed(() => !!slots.children)
  const isActive = computed(() => {
    if (!props.to || props.to === '#') return false
    return route.path === props.to
  })
  const hasActiveChild = computed(() => {
    if (!props.basePath) return false
    return route.path.startsWith(props.basePath)
  })
  const isOpen = ref(hasActiveChild.value)

  watch(hasActiveChild, (value) => {
    if (value) isOpen.value = true
  })
</script>

<template>
  <!-- Dropdown -->
  <div v-if="isDropdown">
    <button
      class="flex w-full items-center gap-3 rounded-lg px-3 py-2"
      :class="
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
      "
      @click="isOpen = !isOpen"
    >
      <font-awesome-icon v-if="icon" :icon="icon" class="h-5 w-5" />
      <span class="flex-1 text-left font-medium">{{ label }}</span>
      <font-awesome-icon
        :icon="['fas', 'chevron-down']"
        class="h-4 w-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
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
    :class="
      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
    "
  >
    <font-awesome-icon v-if="icon" :icon="icon" class="h-5 w-5" />
    <span class="font-medium">{{ label }}</span>
  </NuxtLink>
</template>
