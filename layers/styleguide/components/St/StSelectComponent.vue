<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const selectedFruit = ref('')
  const selectedSize = ref('m')

  const fruits = [
    { value: 'apple', text: 'Apple' },
    { value: 'banana', text: 'Banana' },
    { value: 'cherry', text: 'Cherry' },
    { value: 'mango', text: 'Mango' },
  ]

  const sizes = [
    { value: 'xs', text: 'Extra Small' },
    { value: 's', text: 'Small' },
    { value: 'm', text: 'Medium' },
    { value: 'l', text: 'Large' },
    { value: 'xl', text: 'Extra Large' },
  ]

  const statuses = [
    { value: 'active', text: 'Active' },
    { value: 'inactive', text: 'Inactive' },
    { value: 'pending', text: 'Pending' },
  ]

  const selectExamples = [
    {
      title: 'Basic',
      description: 'Simple select with label and options.',
      code: `<FormSelect
  label="Fruit"
  name="fruit"
  :options="[
    { value: 'apple', text: 'Apple' },
    { value: 'banana', text: 'Banana' },
    { value: 'cherry', text: 'Cherry' },
  ]"
/>`,
    },
    {
      title: 'Required',
      description: 'Select with required validation.',
      code: `<FormSelect
  label="Status"
  name="status"
  :required="true"
  :options="[
    { value: 'active', text: 'Active' },
    { value: 'inactive', text: 'Inactive' },
    { value: 'pending', text: 'Pending' },
  ]"
/>`,
    },
    {
      title: 'v-model',
      description: 'Two-way data binding with v-model.',
      code: `<FormSelect
  v-model="selectedFruit"
  label="Choose a fruit"
  name="fruit-bound"
  :options="fruits"
/>
<p>Selected: {{ selectedFruit }}</p>`,
    },
    {
      title: 'Preselected value',
      description: 'Select with a default value set via v-model.',
      code: `<FormSelect
  v-model="selectedSize"
  label="Size"
  name="size"
  :options="sizes"
/>`,
    },
  ]

  const selectProps = [
    {
      name: 'label',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Label text displayed above the select (required).',
    },
    {
      name: 'name',
      type: 'string',
      values: '—',
      default: "''",
      description: 'Select name and id attribute.',
    },
    {
      name: 'options',
      type: 'ISelectOption[]',
      values: '{ value: string | number, text: string }[]',
      default: '—',
      description: 'Array of options to display (required).',
    },
    {
      name: 'modelValue',
      type: 'string | number',
      values: '—',
      default: "''",
      description: 'Bound value for v-model two-way binding.',
    },
    {
      name: 'required',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'Mark the select as required for form validation.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Select"
      description="Use label, options, v-model and required props to configure FormSelect."
      :examples="selectExamples"
      :component-props="selectProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <div class="max-w-xs">
          <FormSelect
            label="Fruit"
            name="fruit"
            :options="fruits"
          />
        </div>
      </template>

      <!-- Example 1: Required -->
      <template #example-1>
        <div class="max-w-xs">
          <FormSelect
            label="Status"
            name="status"
            :required="true"
            :options="statuses"
          />
        </div>
      </template>

      <!-- Example 2: v-model -->
      <template #example-2>
        <div class="max-w-xs space-y-3">
          <FormSelect
            v-model="selectedFruit"
            label="Choose a fruit"
            name="fruit-bound"
            :options="fruits"
          />
          <p class="text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedFruit || '—' }}</span>
          </p>
        </div>
      </template>

      <!-- Example 3: Preselected value -->
      <template #example-3>
        <div class="max-w-xs space-y-3">
          <FormSelect
            v-model="selectedSize"
            label="Size"
            name="size"
            :options="sizes"
          />
          <p class="text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedSize }}</span>
          </p>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
