<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const solidIcons = [
    'house', 'gear', 'plus', 'trash-can', 'pen-to-square',
    'store', 'chart-line', 'chart-simple', 'chart-bar',
    'dollar-sign', 'star-half-stroke', 'star',
    'icons', 'brush', 'bolt', 'lightbulb',
    'bars', 'ellipsis', 'chevron-down', 'caret-down',
    'hand-pointer', 'keyboard', 'tag', 'table-cells',
    'file-lines', 'right-to-bracket', 'gauge',
    'user', 'magnifying-glass', 'xmark', 'check',
    'heart', 'cart-shopping', 'arrow-down',
  ]

  const brandIcons = [
    'product-hunt', 'github', 'google', 'twitter',
    'facebook', 'instagram', 'youtube', 'linkedin',
  ]

  const copied = ref('')

  function copyIcon(prefix: string, name: string) {
    const text = `['${prefix}', '${name}']`
    navigator.clipboard.writeText(text)
    copied.value = `${prefix}:${name}`
    setTimeout(() => {
      copied.value = ''
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
      title: 'Solid icons (fas)',
      description: 'Click any icon to copy its value. All @fortawesome/free-solid-svg-icons are available.',
      code: `<font-awesome-icon :icon="['fas', 'icon-name']" />`,
    },
    {
      title: 'Brand icons (fab)',
      description: 'Brand icons from @fortawesome/free-brands-svg-icons.',
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
  <div>
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

      <!-- Example 3: Solid icons gallery -->
      <template #example-3>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in solidIcons"
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

      <!-- Example 4: Brand icons gallery -->
      <template #example-4>
        <div class="grid grid-cols-6 gap-3 md:grid-cols-4 sm:grid-cols-3">
          <button
            v-for="name in brandIcons"
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
