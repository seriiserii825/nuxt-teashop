<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const frontHeadersExamples = [
    {
      title: 'Basic',
      description: 'Simple section header with a title only.',
      code: `<FrontHeaders title="Our Products" />`,
    },
    {
      title: 'With description',
      description: 'Header with a title and supporting text.',
      code: `<FrontHeaders title="Our Products" text="Browse our collection of premium teas" />`,
    },
    {
      title: 'With link',
      description: 'Header with a title, description and a navigation link.',
      code: `<FrontHeaders
  title="Popular Teas"
  text="Discover the most loved teas"
  link-text="View all"
  link-url="/products"
/>`,
    },
    {
      title: 'Centered',
      description: 'Use the center prop to center-align the header.',
      code: `<FrontHeaders
  title="About Us"
  text="Premium tea for every occasion"
  :center="true"
/>`,
    },
  ]

  const frontHeadersProps = [
    {
      name: 'title',
      type: 'string',
      values: '—',
      default: '—',
      description: 'Main heading text (required).',
    },
    {
      name: 'text',
      type: 'string',
      values: '—',
      default: "''",
      description: 'Supporting description displayed below the title.',
    },
    {
      name: 'linkText',
      type: 'string',
      values: '—',
      default: "''",
      description: 'Text for the optional navigation link.',
    },
    {
      name: 'linkUrl',
      type: 'string',
      values: '—',
      default: "'#'",
      description: 'URL for the navigation link.',
    },
    {
      name: 'center',
      type: 'boolean',
      values: 'true / false',
      default: 'false',
      description: 'Center-align the header content.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="FrontHeaders"
      description="Section header component for displaying a title, description and optional navigation link."
      :examples="frontHeadersExamples"
      :component-props="frontHeadersProps"
    >
      <!-- Example 0: Basic -->
      <template #example-0>
        <FrontHeaders title="Our Products" />
      </template>

      <!-- Example 1: With description -->
      <template #example-1>
        <FrontHeaders title="Our Products" text="Browse our collection of premium teas" />
      </template>

      <!-- Example 2: With link -->
      <template #example-2>
        <FrontHeaders
          title="Popular Teas"
          text="Discover the most loved teas"
          link-text="View all"
          link-url="/products"
        />
      </template>

      <!-- Example 3: Centered -->
      <template #example-3>
        <FrontHeaders
          title="About Us"
          text="Premium tea for every occasion"
          :center="true"
        />
      </template>
    </StComponentDemoGroup>
  </div>
</template>
