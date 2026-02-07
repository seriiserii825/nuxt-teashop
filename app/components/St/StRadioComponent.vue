<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const selectedFruit = ref('')
  const selectedSize = ref('m')
  const selectedPayment = ref('card')

  const examples = [
    {
      title: 'Basic',
      description: 'A group of radio buttons bound to a single v-model string. Only one option can be selected at a time.',
      code: `<FormRadio v-model="selected" label="Apple" value="apple" name="fruit" />
<FormRadio v-model="selected" label="Banana" value="banana" name="fruit" />
<FormRadio v-model="selected" label="Cherry" value="cherry" name="fruit" />`,
    },
    {
      title: 'Preselected',
      description: 'Set a default value via v-model to preselect a radio button.',
      code: `const selected = ref('m')

<FormRadio v-model="selected" label="S" value="s" name="size" />
<FormRadio v-model="selected" label="M" value="m" name="size" />
<FormRadio v-model="selected" label="L" value="l" name="size" />
<FormRadio v-model="selected" label="XL" value="xl" name="size" />`,
    },
    {
      title: 'Horizontal layout',
      description: 'Wrap in a flex container for inline layout.',
      code: `<div class="flex gap-4">
  <FormRadio v-model="selected" label="Card" value="card" name="payment" />
  <FormRadio v-model="selected" label="Cash" value="cash" name="payment" />
  <FormRadio v-model="selected" label="Transfer" value="transfer" name="payment" />
</div>`,
    },
  ]

  const componentProps = [
    {
      name: 'modelValue',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Bound value for v-model. Holds the currently selected radio value (required).',
    },
    {
      name: 'label',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Text label displayed next to the radio button (required).',
    },
    {
      name: 'value',
      type: 'string',
      values: '—',
      default: '—',
      description: 'The value assigned to v-model when this radio is selected (required).',
    },
    {
      name: 'name',
      type: 'string',
      values: '—',
      default: '—',
      description: 'HTML name attribute, groups radio buttons together (required).',
    },
    {
      name: '@update:modelValue',
      type: 'event',
      values: 'string',
      default: '—',
      description: 'Emitted when a radio button is selected. Used internally by v-model.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Radio"
      description="Use multiple FormRadio components with a shared v-model string to build radio groups."
      :examples="examples"
      :component-props="componentProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <div class="max-w-xs space-y-1">
          <FormRadio v-model="selectedFruit" label="Apple" value="apple" name="fruit" />
          <FormRadio v-model="selectedFruit" label="Banana" value="banana" name="fruit" />
          <FormRadio v-model="selectedFruit" label="Cherry" value="cherry" name="fruit" />
          <FormRadio v-model="selectedFruit" label="Mango" value="mango" name="fruit" />
          <p class="mt-2 text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedFruit || '—' }}</span>
          </p>
        </div>
      </template>

      <!-- Example 1: Preselected -->
      <template #example-1>
        <div class="max-w-xs space-y-1">
          <FormRadio v-model="selectedSize" label="S" value="s" name="size" />
          <FormRadio v-model="selectedSize" label="M" value="m" name="size" />
          <FormRadio v-model="selectedSize" label="L" value="l" name="size" />
          <FormRadio v-model="selectedSize" label="XL" value="xl" name="size" />
          <p class="mt-2 text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedSize }}</span>
          </p>
        </div>
      </template>

      <!-- Example 2: Horizontal layout -->
      <template #example-2>
        <div>
          <div class="flex gap-4">
            <FormRadio v-model="selectedPayment" label="Card" value="card" name="payment" />
            <FormRadio v-model="selectedPayment" label="Cash" value="cash" name="payment" />
            <FormRadio v-model="selectedPayment" label="Transfer" value="transfer" name="payment" />
          </div>
          <p class="mt-2 text-sm text-gray-600">
            Selected: <span class="font-medium text-gray-900">{{ selectedPayment }}</span>
          </p>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
