<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import type { ICategory } from '~/interfaces/ICategory'

  const { data: categories, loading } = useQuery<ICategory[]>(
    categoryService.getAll
  )
</script>

<template>
  <div>
    <div>Home page</div>
    <div v-if="loading">Loading colors...</div>
    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        {{ category.title }} - {{ category.description }}
      </li>
    </ul>
  </div>
</template>
