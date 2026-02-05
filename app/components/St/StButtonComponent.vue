<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const buttonExamples = [
    {
      title: 'Variants',
      description: 'Different button variants: info, danger, success, warning, outline.',
      code: `<Btn variant="btn-info">Info</Btn>
<Btn variant="btn-danger">Danger</Btn>
<Btn variant="btn-success">Success</Btn>
<Btn variant="btn-warning">Warning</Btn>
<Btn variant="btn-outline">Outline</Btn>`,
    },
    {
      title: 'Button types',
      description: 'HTML button types: button, submit, reset.',
      code: `<Btn type="button">Button</Btn>
<Btn type="submit">Submit</Btn>
<Btn type="reset">Reset</Btn>`,
    },
    {
      title: 'States',
      description: 'Loading and disabled states.',
      code: `<Btn :loading="true">Loading</Btn>
<Btn :disabled="true">Disabled</Btn>`,
    },
  ]

  const buttonProps = [
    {
      name: 'type',
      type: 'string',
      values: 'button / submit / reset',
      default: 'button',
      description: 'HTML button type attribute',
    },
    {
      name: 'variant',
      type: 'string',
      values: 'btn-info / btn-danger / btn-success / btn-warning / btn-outline',
      default: 'btn-info',
      description: 'button style variant',
    },
    {
      name: 'loading',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'show loading spinner and disable button',
    },
    {
      name: 'disabled',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'disable the button',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Buttons"
      description="Use variant, type, loading and disabled props to define Button's style and behavior."
      :examples="buttonExamples"
      :component-props="buttonProps"
    >
      <!-- Example 0: Variants -->
      <template #example-0>
        <div class="flex flex-wrap items-center gap-3">
          <Btn variant="btn-info">Info</Btn>
          <Btn variant="btn-danger">Danger</Btn>
          <Btn variant="btn-success">Success</Btn>
          <Btn variant="btn-warning">Warning</Btn>
          <Btn variant="btn-outline">Outline</Btn>
        </div>
      </template>

      <!-- Example 1: Button types -->
      <template #example-1>
        <div class="flex flex-wrap items-center gap-3">
          <Btn type="button">Button</Btn>
          <Btn type="submit" variant="btn-success">Submit</Btn>
          <Btn type="reset" variant="btn-warning">Reset</Btn>
        </div>
      </template>

      <!-- Example 2: States -->
      <template #example-2>
        <div class="flex flex-wrap items-center gap-3">
          <Btn :loading="true">Loading</Btn>
          <Btn :disabled="true">Disabled</Btn>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
