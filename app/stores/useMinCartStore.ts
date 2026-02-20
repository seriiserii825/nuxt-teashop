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

  function setCartItemQuantity(itemId: number, quantity: number) {
    if (cart.value && cart.value.items) {
      const item_index = cart.value.items.findIndex((i) => i.id === itemId)
      const item = cart.value.items[item_index]
      if (item_index !== -1 && item) {
        item.quantity = quantity
      }
    }
  }

  function removeCartItem(itemId: number) {
    if (cart.value && cart.value.items) {
      cart.value.items = cart.value.items.filter((i) => i.id !== itemId)
    }
  }

  return {
    is_visible_drawer,
    setVisibleDrawer,
    cart,
    setCart,
    setCartItemQuantity,
    removeCartItem,
  }
})
