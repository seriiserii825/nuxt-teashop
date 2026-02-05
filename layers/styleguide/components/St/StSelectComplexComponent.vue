<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const selectedShop = ref('')
  const selectedCategory = ref('electronics')

  const shops = [
    { value: 'tea-house', text: 'Tea House' },
    { value: 'green-leaf', text: 'Green Leaf' },
    { value: 'matcha-lab', text: 'Matcha Lab' },
    { value: 'oolong-place', text: 'Oolong Place' },
    { value: 'herbal-garden', text: 'Herbal Garden' },
    { value: 'chai-spot', text: 'Chai Spot' },
  ]

  const categories = [
    { value: 'electronics', text: 'Electronics' },
    { value: 'clothing', text: 'Clothing' },
    { value: 'books', text: 'Books' },
    { value: 'food', text: 'Food & Drinks' },
  ]

  const examples = [
    {
      title: 'Basic',
      description: 'Dropdown select with search, icon, and a group label. Shows up to 5 options by default.',
      code: `<FormSelectComplex
  :icon="['fas', 'store']"
  group-label="Shops"
  button-label="Create new shop"
  :options="shops"
/>`,
    },
    {
      title: 'v-model',
      description: 'Two-way binding. Selecting an option closes the dropdown automatically.',
      code: `<FormSelectComplex
  v-model="selectedShop"
  :icon="['fas', 'store']"
  group-label="Shops"
  button-label="Create new shop"
  :options="shops"
/>
<p>Selected: {{ selectedShop }}</p>`,
    },
    {
      title: 'Custom labels and icon',
      description: 'Override groupLabel, buttonLabel and icon to adapt for any entity.',
      code: `<FormSelectComplex
  v-model="selectedCategory"
  :icon="['fas', 'tag']"
  group-label="Categories"
  button-label="Add category"
  :options="categories"
/>`,
    },
  ]

  const componentProps = [
    {
      name: 'icon',
      type: 'string[]',
      values: "FontAwesome icon, e.g. ['fas', 'store']",
      default: '—',
      description: 'FontAwesome icon shown in the trigger button and next to each option (required).',
    },
    {
      name: 'options',
      type: 'ISelectOption[]',
      values: '{ value: string | number, text: string }[]',
      default: '[]',
      description: 'Array of selectable options.',
    },
    {
      name: 'modelValue',
      type: 'string | number',
      values: '—',
      default: "''",
      description: 'Bound value for v-model. Selecting an option closes the dropdown.',
    },
    {
      name: 'groupLabel',
      type: 'string',
      values: '—',
      default: 'Shops',
      description: 'Label displayed above the options list inside the dropdown.',
    },
    {
      name: 'buttonLabel',
      type: 'string',
      values: '—',
      default: 'Create new shop',
      description: 'Text on the action button at the bottom of the dropdown.',
    },
    {
      name: '@update:modelValue',
      type: 'event',
      values: 'string | number',
      default: '—',
      description: 'Emitted when an option is selected. Used internally by v-model.',
    },
    {
      name: '@closeDropdown',
      type: 'event',
      values: '—',
      default: '—',
      description: 'Emitted when the bottom action button is clicked. Use it to handle "create new" logic in the parent.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Select Complex"
      description="Dropdown select with built-in search, FontAwesome icon, group label, and a create button. Uses v-model, click-outside to close, and filters options as you type."
      :examples="examples"
      :component-props="componentProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <FormSelectComplex
          :icon="['fas', 'store']"
          group-label="Shops"
          button-label="Create new shop"
          :options="shops"
        />
      </template>

      <!-- Example 1: v-model -->
      <template #example-1>
        <div class="space-y-3">
          <FormSelectComplex
            v-model="selectedShop"
            :icon="['fas', 'store']"
            group-label="Shops"
            button-label="Create new shop"
            :options="shops"
          />
          <p class="text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedShop || '—' }}</span>
          </p>
        </div>
      </template>

      <!-- Example 2: Custom labels and icon -->
      <template #example-2>
        <div class="space-y-3">
          <FormSelectComplex
            v-model="selectedCategory"
            :icon="['fas', 'tag']"
            group-label="Categories"
            button-label="Add category"
            :options="categories"
          />
          <p class="text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedCategory }}</span>
          </p>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
