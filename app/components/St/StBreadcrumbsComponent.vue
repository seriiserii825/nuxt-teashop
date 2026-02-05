<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const breadcrumbExamples = [
    {
      title: 'Basic',
      description: 'Basic breadcrumbs with links. The last item has no link and represents the current page.',
      code: `<Breadcrumbs
  :items="[
    { label: 'Home', to: '/' },
    { label: 'Components', to: '/style-guides/components' },
    { label: 'Breadcrumbs' },
  ]"
/>`,
    },
    {
      title: 'Custom separator',
      description: 'Use the separator prop to change the delimiter between items.',
      code: `<Breadcrumbs
  separator=">"
  :items="[
    { label: 'Home', to: '/' },
    { label: 'Products', to: '#' },
    { label: 'Tea sets' },
  ]"
/>

<Breadcrumbs
  separator="•"
  :items="[
    { label: 'Home', to: '/' },
    { label: 'Products', to: '#' },
    { label: 'Tea sets' },
  ]"
/>

<Breadcrumbs
  separator="-"
  :items="[
    { label: 'Home', to: '/' },
    { label: 'Products', to: '#' },
    { label: 'Tea sets' },
  ]"
/>`,
    },
    {
      title: 'Single item',
      description: 'Breadcrumbs with a single item representing the current page.',
      code: `<Breadcrumbs :items="[{ label: 'Home' }]" />`,
    },
  ]

  const breadcrumbProps = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      values: '{ label: string, to?: string }[]',
      default: '—',
      description: 'Array of breadcrumb items. Items with "to" render as links, without — as plain text.',
    },
    {
      name: 'separator',
      type: 'string',
      values: 'any string',
      default: '/',
      description: 'Separator character between breadcrumb items.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="Breadcrumbs"
      description="Use items and separator props to define Breadcrumbs navigation."
      :examples="breadcrumbExamples"
      :component-props="breadcrumbProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <Breadcrumbs
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Components', to: '/style-guides/components' },
            { label: 'Breadcrumbs' },
          ]"
        />
      </template>

      <!-- Example 1: Custom separator -->
      <template #example-1>
        <div class="space-y-4">
          <Breadcrumbs
            separator=">"
            :items="[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '#' },
              { label: 'Tea sets' },
            ]"
          />
          <Breadcrumbs
            separator="•"
            :items="[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '#' },
              { label: 'Tea sets' },
            ]"
          />
          <Breadcrumbs
            separator="-"
            :items="[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '#' },
              { label: 'Tea sets' },
            ]"
          />
        </div>
      </template>

      <!-- Example 2: Single item -->
      <template #example-2>
        <Breadcrumbs :items="[{ label: 'Home' }]" />
      </template>
    </StComponentDemoGroup>
  </div>
</template>
