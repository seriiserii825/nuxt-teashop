<script setup lang="ts">
  import { ref } from 'vue'

  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  // TODO: after get data from api make this component

  const inputValue = ref('')
  const numberValue = ref(0)

  const inputExamples = [
    {
      title: 'Basic',
      description: 'Simple text input with a label.',
      code: `<FormInput name="username" label="Username" />`,
    },
    {
      title: 'Input types',
      description: 'Different HTML input types: text, password, number, email.',
      code: `<FormInput name="text" label="Text" type="text" placeholder="Enter text" />
<FormInput name="password" label="Password" type="password" placeholder="Enter password" />
<FormInput name="amount" label="Number" type="number" placeholder="0" />
<FormInput name="email" label="Email" type="email" placeholder="user@example.com" />`,
    },
    {
      title: 'Placeholder',
      description:
        'Use the placeholder prop to show hint text inside the input.',
      code: `<FormInput name="search" placeholder="Search products..." />`,
    },
    {
      title: 'v-model',
      description: 'Two-way data binding with v-model.',
      code: `<FormInput v-model="inputValue" name="bound" label="Type something" placeholder="Type here..." />
<p>Value: {{ inputValue }}</p>`,
    },
  ]

  const inputProps = [
    {
      name: 'name',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Input name and id attribute (required).',
    },
    {
      name: 'label',
      type: 'string',
      values: '—',
      default: "''",
      description: 'Label text displayed above the input.',
    },
    {
      name: 'type',
      type: 'string',
      values: 'text / password / number / email / etc.',
      default: 'text',
      description: 'HTML input type attribute.',
    },
    {
      name: 'placeholder',
      type: 'string',
      values: '—',
      default: "''",
      description: 'Placeholder text shown when input is empty.',
    },
    {
      name: 'modelValue',
      type: 'string | number',
      values: '—',
      default: "''",
      description: 'Bound value for v-model two-way binding.',
    },
    {
      name: 'focus',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'Auto-focus the input on mount.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Inputs"
      description="Use name, label, type, placeholder and v-model props to configure FormInput."
      :examples="inputExamples"
      :component-props="inputProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <div class="max-w-xs">
          <FormInput name="username" label="Username" />
        </div>
      </template>

      <!-- Example 1: Input types -->
      <template #example-1>
        <div class="grid max-w-lg grid-cols-2 gap-4">
          <FormInput
            name="text"
            label="Text"
            type="text"
            placeholder="Enter text"
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <FormInput
            name="amount"
            label="Number"
            type="number"
            placeholder="0"
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="user@example.com"
          />
        </div>
      </template>

      <!-- Example 2: Placeholder -->
      <template #example-2>
        <div class="max-w-xs">
          <FormInput name="search" placeholder="Search products..." />
        </div>
      </template>

      <!-- Example 3: v-model -->
      <template #example-3>
        <div class="max-w-xs space-y-3">
          <FormInput
            v-model="inputValue"
            name="bound"
            label="Type something"
            placeholder="Type here..."
          />
          <p class="text-sm text-gray-600">
            Value:
            <span class="font-medium text-gray-900">{{ inputValue }}</span>
          </p>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
