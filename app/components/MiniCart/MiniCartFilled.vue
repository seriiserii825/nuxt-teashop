<script setup lang="ts">
  import { cartService } from '~/api/services/cartService'

  const mini_cart_store = useMiniCartStore()
  const { cart } = storeToRefs(mini_cart_store)

  const total = computed(() =>
    (cart.value?.items ?? []).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  )

  defineEmits(['emit-close'])

  function updateQuantity({
    cart_item_id,
    new_quantity,
  }: {
    cart_item_id: number
    new_quantity: number
  }) {
    mini_cart_store.setCartItemQuantity(cart_item_id, new_quantity)
  }

  function removeItem(cart_item_id: number) {
    mini_cart_store.removeCartItem(cart_item_id)
  }

  async function clearCart() {
    const agree = await useSweetConfirm(
      'Are you sure you want to clear the cart?'
    )
    if (!agree.isConfirmed) return
    try {
      await cartService.clear()
      mini_cart_store.setCart(null)
    } catch (error) {
      handleAxiosError(error)
    }
  }
</script>

<template>
  <div>
    <!-- Cart Header -->
    <div class="border-b border-gray-200 px-6 py-5">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Cart products</h2>
        <button
          class="text-gray-400 transition hover:text-gray-600"
          @click="$emit('emit-close')"
        >
          <IconIClose />
        </button>
      </div>
    </div>

    <!-- Cart Items -->
    <div
      v-if="cart && cart.items"
      class="max-h-[70vh] flex-1 overflow-y-auto py-4"
    >
      <MiniCartItem
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
        @quantity-updated="updateQuantity"
        @item-removed="removeItem"
      />
    </div>

    <!-- Cart Footer -->
    <div v-if="cart && cart.items" class="border-t border-gray-200">
      <!-- Total -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-lg">
          <span class="text-gray-700">Total payable:</span>
          <span class="font-bold text-gray-900">{{
            useFormatPrice(total)
          }}</span>
        </div>
      </div>

      <div class="flex justify-between gap-4">
        <button class="btn btn-danger" @click="clearCart">Clear cart</button>
        <button class="btn btn-primary">Proceed to payment</button>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-4 py-10">
      <IconIShoppingCart class="h-12 w-12 text-gray-400" />
      <p class="text-gray-500">Your cart is empty</p>
    </div>
  </div>
</template>
