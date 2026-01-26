<script setup lang="ts">
  import { colorService } from '~/api/services/colorService'
  import type { IColor } from '~/interfaces/IColor'

  const store_id = useIdParamFromUrl()

  const { data: colors, loading } = useQuery<IColor[]>(() =>
    colorService.getAll(+store_id.value)
  )
</script>

<template>
  <div>
    <div>Home page</div>
    <div v-if="loading">Loading colors...</div>
    <ul v-else>
      <li v-for="color in colors" :key="color.id">
        {{ color.name }} - {{ color.value }}
      </li>
    </ul>
  </div>
</template>
