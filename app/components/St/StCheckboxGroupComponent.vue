<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const selectedFruits = ref<string[]>([])
  const selectedSizes = ref<string[]>(['m', 'l'])

  const examples = [
    {
      title: 'Basic',
      description: 'A group of checkboxes bound to a single v-model array. Selecting a checkbox adds its value, deselecting removes it.',
      code: `<FormCheckboxGroup v-model="selected" label="Apple" value="apple" name="fruits" />
<FormCheckboxGroup v-model="selected" label="Banana" value="banana" name="fruits" />
<FormCheckboxGroup v-model="selected" label="Cherry" value="cherry" name="fruits" />`,
    },
    {
      title: 'With count',
      description: 'Show a count badge next to the label using the count prop.',
      code: `<FormCheckboxGroup v-model="selected" label="Electronics" value="electronics" name="category" :count="42" />
<FormCheckboxGroup v-model="selected" label="Clothing" value="clothing" name="category" :count="18" />
<FormCheckboxGroup v-model="selected" label="Books" value="books" name="category" :count="7" />`,
    },
    {
      title: 'Disabled',
      description: 'Disable individual checkboxes with the disabled prop.',
      code: `<FormCheckboxGroup v-model="selected" label="Available" value="available" name="status" />
<FormCheckboxGroup v-model="selected" label="Sold out" value="sold" name="status" disabled />`,
    },
    {
      title: 'Preselected',
      description: 'Pass an array with initial values to v-model to preselect checkboxes.',
      code: `const selected = ref(['m', 'l'])

<FormCheckboxGroup v-model="selected" label="S" value="s" name="size" />
<FormCheckboxGroup v-model="selected" label="M" value="m" name="size" />
<FormCheckboxGroup v-model="selected" label="L" value="l" name="size" />
<FormCheckboxGroup v-model="selected" label="XL" value="xl" name="size" />`,
    },
  ]

  const componentProps = [
    {
      name: 'modelValue',
      type: 'string[]',
      values: '—',
      default: '—',
      description: 'Bound array for v-model. Selected values are added, deselected are removed (required).',
    },
    {
      name: 'label',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Text label displayed next to the checkbox (required).',
    },
    {
      name: 'value',
      type: 'string',
      values: '—',
      default: '—',
      description: 'The value added to / removed from the modelValue array (required).',
    },
    {
      name: 'name',
      type: 'string',
      values: '—',
      default: '—',
      description: 'HTML name attribute, groups checkboxes together (required).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'Disable the checkbox and apply reduced opacity.',
    },
    {
      name: 'count',
      type: 'number',
      values: '—',
      default: '0',
      description: 'Optional count badge displayed after the label in parentheses.',
    },
    {
      name: '@update:modelValue',
      type: 'event',
      values: 'string[]',
      default: '—',
      description: 'Emitted when a checkbox is toggled. Used internally by v-model.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Checkbox Group"
      description="Use multiple FormCheckboxGroup components with a shared v-model array to build checkbox groups."
      :examples="examples"
      :component-props="componentProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <div class="max-w-xs">
          <FormCheckboxGroup v-model="selectedFruits" label="Apple" value="apple" name="fruits" />
          <FormCheckboxGroup v-model="selectedFruits" label="Banana" value="banana" name="fruits" />
          <FormCheckboxGroup v-model="selectedFruits" label="Cherry" value="cherry" name="fruits" />
          <FormCheckboxGroup v-model="selectedFruits" label="Mango" value="mango" name="fruits" />
          <p class="mt-2 text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedFruits.length ? selectedFruits.join(', ') : '—' }}</span>
          </p>
        </div>
      </template>

      <!-- Example 1: With count -->
      <template #example-1>
        <div class="max-w-xs">
          <FormCheckboxGroup v-model="selectedFruits" label="Electronics" value="electronics" name="category" :count="42" />
          <FormCheckboxGroup v-model="selectedFruits" label="Clothing" value="clothing" name="category" :count="18" />
          <FormCheckboxGroup v-model="selectedFruits" label="Books" value="books" name="category" :count="7" />
        </div>
      </template>

      <!-- Example 2: Disabled -->
      <template #example-2>
        <div class="max-w-xs">
          <FormCheckboxGroup v-model="selectedFruits" label="Available" value="available" name="status" />
          <FormCheckboxGroup v-model="selectedFruits" label="Sold out" value="sold" name="status" disabled />
        </div>
      </template>

      <!-- Example 3: Preselected -->
      <template #example-3>
        <div class="max-w-xs">
          <FormCheckboxGroup v-model="selectedSizes" label="S" value="s" name="size" />
          <FormCheckboxGroup v-model="selectedSizes" label="M" value="m" name="size" />
          <FormCheckboxGroup v-model="selectedSizes" label="L" value="l" name="size" />
          <FormCheckboxGroup v-model="selectedSizes" label="XL" value="xl" name="size" />
          <p class="mt-2 text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedSizes.join(', ') }}</span>
          </p>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
