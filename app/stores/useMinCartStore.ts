import { defineStore } from 'pinia'

import { ref } from 'vue'

import type { ICart } from '~/interfaces/ICart'

export const useMiniCartStore = defineStore('miniCart', () => {
  const cart = ref<ICart | null>(null)
  function setCart(newCart: ICart | null) {
    cart.value = newCart
  }
  const is_visible_drawer = ref(false)
  function setVisibleDrawer(visible: boolean) {
    is_visible_drawer.value = visible
  }
  return {
    is_visible_drawer,
    setVisibleDrawer,
    cart,
    setCart,
  }
})
