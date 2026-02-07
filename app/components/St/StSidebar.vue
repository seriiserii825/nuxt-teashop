<script setup lang="ts">
  import { ROUTES } from '~~/app/data/app_urls'

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
      <StSidebarItem
        :label="ROUTES.HOME.label"
        :to="ROUTES.HOME.path"
        :icon="ROUTES.HOME.icon"
      />

      <StSidebarItem
        :label="ROUTES.STYLE_GUIDES.label"
        :to="ROUTES.STYLE_GUIDES.path"
        :icon="ROUTES.STYLE_GUIDES.icon"
      />

      <StSidebarItem
        :label="ROUTES.COLORS.label"
        :to="ROUTES.COLORS.path"
        :icon="ROUTES.COLORS.icon"
      />

      <StSidebarItem
        :label="ROUTES.ICONS.label"
        :to="ROUTES.ICONS.path"
        :icon="ROUTES.ICONS.icon"
      />

      <StSidebarItem
        :label="ROUTES.COMPONENTS.label"
        :to="ROUTES.COMPONENTS.path"
        :icon="ROUTES.COMPONENTS.icon"
      >
        <template #children>
          <StSidebarItem
            :label="ROUTES.BUTTONS.label"
            :to="ROUTES.BUTTONS.path"
            :icon="ROUTES.BUTTONS.icon"
          />
          <StSidebarItem
            :label="ROUTES.BREADCRUMBS.label"
            :to="ROUTES.BREADCRUMBS.path"
            :icon="ROUTES.BREADCRUMBS.icon"
          />
          <StSidebarItem
            :label="ROUTES.INPUTS.label"
            :to="ROUTES.INPUTS.path"
            :icon="ROUTES.INPUTS.icon"
          />
          <StSidebarItem
            :label="ROUTES.SELECTS.label"
            :to="ROUTES.SELECTS.path"
            :icon="ROUTES.SELECTS.icon"
          />
          <StSidebarItem
            :label="ROUTES.SELECT_COMPLEX.label"
            :to="ROUTES.SELECT_COMPLEX.path"
            :icon="ROUTES.SELECT_COMPLEX.icon"
          />
          <StSidebarItem
            :label="ROUTES.CHECKBOX_GROUP.label"
            :to="ROUTES.CHECKBOX_GROUP.path"
            :icon="ROUTES.CHECKBOX_GROUP.icon"
          />
          <StSidebarItem
            :label="ROUTES.RADIO.label"
            :to="ROUTES.RADIO.path"
            :icon="ROUTES.RADIO.icon"
          />
        </template>
      </StSidebarItem>

      <StSidebarItem
        label="Blocks"
        base-path="/style-guides/blocks"
        :icon="['fas', 'cube']"
      >
        <template #children>
          <StSidebarItem
            :label="ROUTES.PRODUCT_GRID.label"
            :to="ROUTES.PRODUCT_GRID.path"
            :icon="ROUTES.PRODUCT_GRID.icon"
          />
          <StSidebarItem
            :label="ROUTES.FRONT_HEADERS.label"
            :to="ROUTES.FRONT_HEADERS.path"
            :icon="ROUTES.FRONT_HEADERS.icon"
          />
        </template>
      </StSidebarItem>
    </nav>
  </aside>
</template>
