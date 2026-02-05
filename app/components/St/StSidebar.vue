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
      <StSidebarItem
        label="Home"
        to="/style-guides"
        :icon="['fas', 'house']"
      />

      <StSidebarItem label="Componenti" :icon="['fas', 'gear']">
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
        </template>
      </StSidebarItem>

      <StSidebarItem
        label="Landing"
        to="#"
        :icon="['fas', 'file-lines']"
      />

      <StSidebarItem
        label="Portale"
        to="#"
        :icon="['fas', 'table-cells']"
      />

      <StSidebarItem
        label="Login"
        to="#"
        :icon="['fas', 'right-to-bracket']"
      />

      <StSidebarItem label="Esempi" :icon="['fas', 'lightbulb']">
        <template #children>
          <StSidebarItem
            label="Example 1"
            to="#"
            :icon="['fas', 'bolt']"
          />
        </template>
      </StSidebarItem>
    </nav>
  </aside>
</template>
