<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  // Icons actually used in the project
  const usedSolidIcons = [
    'house', 'gear', 'store', 'gauge', 'bars',
    'plus', 'pen-to-square', 'trash-can',
    'chart-line', 'chart-simple', 'chart-bar',
    'dollar-sign', 'star-half-stroke', 'icons', 'brush',
    'chevron-down', 'caret-down', 'ellipsis',
    'hand-pointer', 'keyboard', 'tag', 'table-cells',
    'file-lines', 'right-to-bracket',
    'bolt', 'lightbulb',
  ]

  const usedBrandIcons = [
    'product-hunt',
  ]

  // Extra useful icons for quick access
  const extraSolidIcons = [
    'star', 'heart', 'check', 'xmark',
    'user', 'magnifying-glass', 'cart-shopping', 'arrow-down',
    'arrow-up', 'arrow-left', 'arrow-right',
    'circle-info', 'circle-check', 'circle-xmark', 'triangle-exclamation',
    'eye', 'eye-slash', 'lock', 'unlock',
    'envelope', 'phone', 'image', 'download', 'upload',
    'filter', 'sort', 'clock', 'calendar',
    'trash', 'copy', 'share', 'link',
  ]

  const extraBrandIcons = [
    'github', 'google', 'twitter',
    'facebook', 'instagram', 'youtube', 'linkedin',
  ]

  const copied = ref('')
  const copiedText = ref('')
  const showToast = ref(false)

  function copyIcon(prefix: string, name: string) {
    const text = `<font-awesome-icon :icon="['${prefix}', '${name}']" />`
    navigator.clipboard.writeText(text)
    copied.value = `${prefix}:${name}`
    copiedText.value = text
    showToast.value = true
    setTimeout(() => {
      copied.value = ''
      showToast.value = false
    }, 1500)
  }

  const examples = [
    {
      title: 'Basic usage',
      description: 'Use font-awesome-icon with :icon prop. The icon value is an array: [prefix, icon-name].',
      code: `<font-awesome-icon :icon="['fas', 'house']" />
<font-awesome-icon :icon="['fas', 'gear']" />
<font-awesome-icon :icon="['fas', 'star']" />
<font-awesome-icon :icon="['fab', 'github']" />`,
    },
    {
      title: 'Sizes',
      description: 'Control size with Tailwind classes or FontAwesome size prop.',
      code: `<font-awesome-icon :icon="['fas', 'star']" class="text-xs" />
<font-awesome-icon :icon="['fas', 'star']" class="text-base" />
<font-awesome-icon :icon="['fas', 'star']" class="text-2xl" />
<font-awesome-icon :icon="['fas', 'star']" class="text-4xl" />`,
    },
    {
      title: 'Colors',
      description: 'Apply Tailwind text color classes to change icon color.',
      code: `<font-awesome-icon :icon="['fas', 'heart']" class="text-red-500" />
<font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
<font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
<font-awesome-icon :icon="['fas', 'bolt']" class="text-blue-500" />
<font-awesome-icon :icon="['fas', 'gear']" class="text-gray-400" />`,
    },
    {
      title: 'Used in project (fas)',
      description: 'Solid icons currently used across the project. Click to copy the full tag.',
      code: `<font-awesome-icon :icon="['fas', 'icon-name']" />`,
    },
    {
      title: 'Used in project (fab)',
      description: 'Brand icons currently used in the project.',
      code: `<font-awesome-icon :icon="['fab', 'icon-name']" />`,
    },
    {
      title: 'Other solid icons (fas)',
      description: 'Extra useful solid icons for quick access. All @fortawesome/free-solid-svg-icons are available.',
      code: `<font-awesome-icon :icon="['fas', 'icon-name']" />`,
    },
    {
      title: 'Other brand icons (fab)',
      description: 'Extra brand icons from @fortawesome/free-brands-svg-icons.',
      code: `<font-awesome-icon :icon="['fab', 'icon-name']" />`,
    },
  ]

  const componentProps = [
    {
      name: ':icon',
      type: 'string[]',
      values: "['fas', 'name'] / ['fab', 'name']",
      default: '—',
      description: "Icon to display. First element is the prefix ('fas' for solid, 'fab' for brands), second is the icon name.",
    },
    {
      name: 'class',
      type: 'string',
      values: 'Tailwind classes',
      default: '—',
      description: 'Use Tailwind text-* classes for size and color (e.g. text-2xl text-red-500).',
    },
  ]
</script>

<template>
  <div class="relative">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white shadow-lg"
      >
        <font-awesome-icon :icon="['fas', 'check']" class="text-green-400" />
        <span>Copied <code class="rounded bg-gray-700 px-1.5 py-0.5 text-xs">{{ copiedText }}</code></span>
      </div>
    </Transition>

    <StComponentDemoGroup
      title="Icons"
      description="FontAwesome icons via font-awesome-icon component. Uses @fortawesome/free-solid-svg-icons (fas) and @fortawesome/free-brands-svg-icons (fab). All icons are registered globally in plugins/fontawesome.ts."
      :examples="examples"
      :component-props="componentProps"
    >
      <!-- Example 0: Basic usage -->
      <template #example-0>
        <div class="flex items-center gap-5 text-2xl text-gray-700">
          <font-awesome-icon :icon="['fas', 'house']" />
          <font-awesome-icon :icon="['fas', 'gear']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fab', 'github']" />
        </div>
      </template>

      <!-- Example 1: Sizes -->
      <template #example-1>
        <div class="flex items-end gap-5 text-gray-700">
          <font-awesome-icon :icon="['fas', 'star']" class="text-xs" />
          <font-awesome-icon :icon="['fas', 'star']" class="text-base" />
          <font-awesome-icon :icon="['fas', 'star']" class="text-2xl" />
          <font-awesome-icon :icon="['fas', 'star']" class="text-4xl" />
        </div>
      </template>

      <!-- Example 2: Colors -->
      <template #example-2>
        <div class="flex items-center gap-5 text-2xl">
          <font-awesome-icon :icon="['fas', 'heart']" class="text-red-500" />
          <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
          <font-awesome-icon :icon="['fas', 'check']" class="text-green-500" />
          <font-awesome-icon :icon="['fas', 'bolt']" class="text-blue-500" />
          <font-awesome-icon :icon="['fas', 'gear']" class="text-gray-400" />
        </div>
      </template>

      <!-- Example 3: Used solid icons -->
      <template #example-3>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in usedSolidIcons"
            :key="name"
            class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
            :class="copied === `fas:${name}` ? 'border-green-400 bg-green-50' : ''"
            @click="copyIcon('fas', name)"
          >
            <font-awesome-icon :icon="['fas', name]" class="text-xl text-gray-700" />
            <span class="text-xs text-gray-500">{{ name }}</span>
          </button>
        </div>
      </template>

      <!-- Example 4: Used brand icons -->
      <template #example-4>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in usedBrandIcons"
            :key="name"
            class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
            :class="copied === `fab:${name}` ? 'border-green-400 bg-green-50' : ''"
            @click="copyIcon('fab', name)"
          >
            <font-awesome-icon :icon="['fab', name]" class="text-xl text-gray-700" />
            <span class="text-xs text-gray-500">{{ name }}</span>
          </button>
        </div>
      </template>

      <!-- Example 5: Extra solid icons -->
      <template #example-5>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in extraSolidIcons"
            :key="name"
            class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
            :class="copied === `fas:${name}` ? 'border-green-400 bg-green-50' : ''"
            @click="copyIcon('fas', name)"
          >
            <font-awesome-icon :icon="['fas', name]" class="text-xl text-gray-700" />
            <span class="text-xs text-gray-500">{{ name }}</span>
          </button>
        </div>
      </template>

      <!-- Example 6: Extra brand icons -->
      <template #example-6>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in extraBrandIcons"
            :key="name"
            class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
            :class="copied === `fab:${name}` ? 'border-green-400 bg-green-50' : ''"
            @click="copyIcon('fab', name)"
          >
            <font-awesome-icon :icon="['fab', name]" class="text-xl text-gray-700" />
            <span class="text-xs text-gray-500">{{ name }}</span>
          </button>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
