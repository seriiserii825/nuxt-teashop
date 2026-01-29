<script lang="ts" setup>
  import type { PropType } from 'vue'

  import type { IStore } from '~/interfaces/IStore'

  defineProps({
    stores: {
      type: Array as PropType<IStore[]>,
      required: true,
    },
  })
</script>
<template>
  <div class="grid grid-cols-3 gap-8 py-8 lg:grid-cols-3 md:grid-cols-2">
    <ShopCard v-for="store in stores" :key="store.id" :store="store" />
  </div>
</template>
