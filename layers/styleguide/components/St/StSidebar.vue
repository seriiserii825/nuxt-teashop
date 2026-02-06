<script setup lang="ts">
  defineProps({
    name: {
      type: String,
      required: false,
      default: '',
    },
  })
</script>

<template>
  <aside class="w-64 border-r border-gray-200 bg-white p-6">
    <div v-if="name" class="mb-8">
      <p class="text-sm text-gray-600">Welcome,</p>
      <p class="text-lg font-semibold text-gray-800">{{ name }}</p>
    </div>

    <nav class="space-y-2">
      <StSidebarItem label="Home" to="/style-guides" :icon="['fas', 'house']" />

      <StSidebarItem
        label="Colors"
        to="/style-guides/colors"
        :icon="['fas', 'palette']"
      />

      <StSidebarItem
        label="Icons"
        to="/style-guides/icons"
        :icon="['fas', 'icons']"
      />

      <StSidebarItem label="Components" :icon="['fas', 'gear']">
        <template #children>
          <StSidebarItem
            label="Buttons"
            to="/style-guides/components"
            :icon="['fas', 'hand-pointer']"
          />
          <StSidebarItem
            label="Breadcrumbs"
            to="/style-guides/components/breadcrumbs"
            :icon="['fas', 'ellipsis']"
          />
          <StSidebarItem
            label="Inputs"
            to="/style-guides/components/inputs"
            :icon="['fas', 'keyboard']"
          />
          <StSidebarItem
            label="Selects"
            to="/style-guides/components/selects"
            :icon="['fas', 'caret-down']"
          />
          <StSidebarItem
            label="SelectComplex"
            to="/style-guides/components/select-complex"
            :icon="['fas', 'caret-down']"
          />
          <StSidebarItem
            label="CheckboxGroup"
            to="/style-guides/components/checkbox-group"
            :icon="['fas', 'check']"
          />
          <StSidebarItem
            label="Radio"
            to="/style-guides/components/radio"
            :icon="['fas', 'circle-dot']"
          />
        </template>
      </StSidebarItem>

      <StSidebarItem label="Blocks" :icon="['fas', 'cube']">
        <template #children>
          <StSidebarItem
            label="ProductGrid"
            to="/style-guides/blocks/product-grid"
            :icon="['fas', 'border-all']"
          />
        </template>
      </StSidebarItem>
    </nav>
  </aside>
</template>
