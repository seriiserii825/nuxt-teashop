<script setup lang="ts">
  import type { IProduct } from '~/interfaces/IProduct'

  definePageMeta({
    layout: 'store',
  })

  const search = ref('')
  const filtered_products = ref<IProduct[]>([])
  const columns = ref<Record<'key' | 'label', string>[]>([
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
  ])
  const products = ref<
    Pick<IProduct, 'id' | 'title' | 'description' | 'price'>[]
  >([
    {
      id: '1',
      title: 'Product A',
      description: 'Description for product a',
      price: 29.99,
    },
  ])
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Products"
      description="All shop products"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="console.log('Create product')"
    />
    <FormInput
      v-model="search"
      name="search"
      placeholder="Search products..."
      class="mb-6 w-full max-w-md"
    />
    <DataTable :columns="columns" :data="products" />
  </div>
</template>
