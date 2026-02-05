# Nuxt Teashop Admin Panel

Nuxt 4 SPA admin panel for managing stores, products, categories, colors, orders, and reviews.

## Quick Start

```bash
bun install
bun run dev
```

## Commands

```bash
bun run dev          # Start dev server
bun run build        # Lint + type-check + build
bun run lint         # ESLint check
bun run lint:fix     # ESLint auto-fix
bun run type:check   # TypeScript type checking
bun run preview      # Preview production build
```

## Layers

The project uses [Nuxt Layers](https://nuxt.com/docs/getting-started/layers) to separate reusable code from project-specific logic.

```
layers/
  ui/              # Reusable UI components
  styleguide/      # Style guide pages and demo infrastructure
```

Both layers are connected in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['./layers/ui', './layers/styleguide'],
})
```

### layers/ui

Generic UI components with auto-import. Component names stay the same as without layers.

```
layers/ui/components/
  Btn.vue                      # <Btn>
  Breadcrumbs.vue              # <Breadcrumbs>
  Card.vue                     # <Card>
  CardBig.vue                  # <CardBig>
  DataTable.vue                # <DataTable>
  Drawer.vue                   # <Drawer>
  FileUpload.vue               # <FileUpload>
  Heading.vue                  # <Heading>
  IStar.vue                    # <IStar>
  Pagination.vue               # <Pagination>
  Popup.vue                    # <Popup>
  Preloader.vue                # <Preloader>
  Form/
    FormInput.vue              # <FormInput>
    FormTextarea.vue           # <FormTextarea>
    FormSelect.vue             # <FormSelect>
    FormSelectComplex.vue      # <FormSelectComplex>
    FormRadio.vue              # <FormRadio>
    FormCheckboxGroup.vue      # <FormCheckboxGroup>
    FormStars.vue              # <FormStars>
    FromRangePrice.vue         # <FromRangePrice>
  Icon/
    IArrowDown.vue ... ISettings.vue  # 12 icon components
```

### layers/styleguide

Interactive component documentation with live demos, code snippets, and props tables. Available at `/style-guides`.

```
layers/styleguide/
  components/St/
    StComponentDemoGroup.vue    # Demo wrapper with tabs (Demo / Attributes)
    StComponentDemo.vue         # Single demo container
    StSidebar.vue               # Style guide navigation
    StSidebarItem.vue           # Navigation item (supports nesting)
    StHeader.vue                # Style guide header
    StButtonComponent.vue       # Btn documentation
    StBreadcrumbsComponent.vue  # Breadcrumbs documentation
    StInputsComponent.vue       # FormInput documentation
  layouts/
    style-guides.vue            # Layout with sidebar + content area
  pages/style-guides/
    index.vue                   # Style guide home
    components/
      index.vue                 # Buttons page
      breadcrumbs.vue           # Breadcrumbs page
      inputs.vue                # Inputs page
```

## Using Layers in Another Project

### Option 1: Copy the folder

Copy `layers/ui` (and optionally `layers/styleguide`) into your new project and add to `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/ui',
    './layers/styleguide', // optional, only for docs
  ],
})
```

All components are immediately available via auto-import. No name changes needed.

### Option 2: Git submodule

```bash
git submodule add <repo-url> layers/ui
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['./layers/ui'],
})
```

### Option 3: npm package

Publish the layer as an npm package:

```bash
# In the layer directory
npm init -y
npm publish
```

```bash
# In the consuming project
bun add my-ui-layer
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['my-ui-layer'],
})
```

### Option 4: Remote git repository

Reference a layer directly from a git repo:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    'github:username/my-ui-layer',
  ],
})
```

## Adding a New Component to the Style Guide

1. Create the component in `layers/ui/components/`

2. Create a demo component in `layers/styleguide/components/St/St<Name>Component.vue`:

```vue
<script setup lang="ts">
  import StComponentDemoGroup from './StComponentDemoGroup.vue'

  const examples = [
    {
      title: 'Basic',
      description: 'Basic usage example.',
      code: `<MyComponent prop="value" />`,
    },
  ]

  const componentProps = [
    {
      name: 'prop',
      type: 'string',
      values: '-',
      default: "''",
      description: 'Description of the prop.',
    },
  ]
</script>

<template>
  <div>
    <StComponentDemoGroup
      title="MyComponent"
      description="Component description."
      :examples="examples"
      :component-props="componentProps"
    >
      <template #example-0>
        <MyComponent prop="value" />
      </template>
    </StComponentDemoGroup>
  </div>
</template>
```

3. Create a page in `layers/styleguide/pages/style-guides/components/my-component.vue`:

```vue
<script setup lang="ts">
  definePageMeta({
    layout: 'style-guides',
  })
</script>

<template>
  <div>
    <Breadcrumbs
      :items="[
        { label: 'Home', to: '/style-guides/components' },
        { label: 'MyComponent' },
      ]"
    />
    <StMyComponentComponent />
  </div>
</template>
```

4. Add the link to `layers/styleguide/components/St/StSidebar.vue` navigation.
