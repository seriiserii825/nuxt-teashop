<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const buttonExamples = [
    {
      title: 'Basic button',
      description: 'Use color, plain, round and circle to set button styles.',
      code: `<Btn>
        <span>Default</span>
      </Btn>

      <Btn @click="clickHandler" :small="true">
        <span>Small</span>
      </Btn>`,
    },
    {
      title: 'Colored buttons',
      description:
        'Different colored buttons: primary, success, error, contrast.',
      code: `<Button color="primary" :small="true">
        <span>Primary</span>
      </Button>

      <Button color="success" :small="true">
        <span>Success</span>
      </Button>

      <Button color="error" :small="true">
        <span>Error</span>
      </Button>

      <Button color="contrast" :small="true">
        <span>Contrast</span>
      </Button>`,
    },
    {
      title: 'Outline buttons',
      description: 'Button with outline styling.',
      code: `<Button :outline="true" :small="true">
        <span>Default Outline</span>
      </Button>

      <Button :outline="true" color="primary" :small="true">
        <span>Primary Outline</span>
      </Button>

      <Button :outline="true" color="success" :small="true">
        <span>Success Outline</span>
      </Button>`,
    },
    {
      title: 'Link buttons',
      description: 'Buttons with navigation functionality.',
      code: `<!-- External Link -->
      <Button external_link="https://google.com" :small="true">
        <span>External Link</span>
      </Button>

      <!-- Router Link -->
      <Button router_link="/" :small="true">
        <span>Router Link</span>
      </Button>`,
    },
  ]

  const buttonProps = [
    {
      name: 'small',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'determine whether it is a small button with auto width',
    },
    {
      name: 'color',
      type: 'string',
      values: 'primary / success / error / contrast',
      default: '—',
      description: 'button color',
    },
    {
      name: 'outline',
      type: 'boolean',
      values: '—',
      default: 'false',
      description: 'determine whether it is an outline button',
    },
    {
      name: 'external_link',
      type: 'string',
      values: '—',
      default: '—',
      description: 'external URL for navigation',
    },
    {
      name: 'router_link',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Vue Router path for navigation',
    },
  ]

  const clickHandler = () => {
    console.log('Button clicked!')
  }
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Buttons"
      description="Use color, outline, and small props to define Button's style."
      :examples="buttonExamples"
      :component-props="buttonProps"
    >
      <!-- Example 0: Basic buttons -->
      <template #example-0>
        <div class="flex items-start gap-2 gap-4">
          <Btn>
            <span>Default Info</span>
          </Btn>
          <Btn variant="btn-danger">
            <span>Danger</span>
          </Btn>
          <Btn variant="btn-success">
            <span>Success</span>
          </Btn>
          <Btn variant="btn-warning">
            <span>Warning</span>
          </Btn>
          <Btn variant="btn-outline">
            <span>Outline</span>
          </Btn>
        </div>
      </template>

      <!-- Example 1: Colored buttons -->
      <template #example-1>
        <div class="flex flex-wrap items-center gap-3">
          <Button color="primary" :small="true">
            <span>Primary</span>
          </Button>
          <Button color="success" :small="true">
            <span>Success</span>
          </Button>
          <Button color="error" :small="true">
            <span>Error</span>
          </Button>
          <Button color="contrast" :small="true">
            <span>Contrast</span>
          </Button>
        </div>
      </template>

      <!-- Example 2: Outline buttons -->
      <template #example-2>
        <div class="flex flex-wrap items-center gap-3">
          <Button :outline="true" :small="true">
            <span>Default Outline</span>
          </Button>
          <Button :outline="true" color="primary" :small="true">
            <span>Primary Outline</span>
          </Button>
          <Button :outline="true" color="success" :small="true">
            <span>Success Outline</span>
          </Button>
        </div>
      </template>

      <!-- Example 3: Link buttons -->
      <template #example-3>
        <div class="flex flex-wrap items-center gap-3">
          <Button external_link="https://google.com" :small="true">
            <span>External Link</span>
          </Button>
          <Button router_link="/" :small="true">
            <span>Router Link</span>
          </Button>
        </div>
      </template>
    </StComponentDemoGroup>
  </div>
</template>
