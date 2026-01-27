import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useMiniCartStore = defineStore('miniCart', () => {
  const is_visible_drawer = ref(false)
  function setVisibleDrawer(visible: boolean) {
    is_visible_drawer.value = visible
  }
  return {
    is_visible_drawer,
    setVisibleDrawer,
  }
})
