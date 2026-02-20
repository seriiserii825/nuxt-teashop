<script setup lang="ts">
  const mini_cart_store = useMiniCartStore()
  const { cart } = storeToRefs(mini_cart_store)

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
    <div class="border-t border-gray-200 px-6 py-5">
      <!-- Total -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-lg">
          <span class="text-gray-700">Total payable:</span>
          <span class="font-bold text-gray-900">62 398 ₽</span>
        </div>
      </div>

      <!-- Checkout Button -->
      <button
        class="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition duration-200 hover:bg-blue-700"
      >
        Proceed to payment
      </button>
    </div>
  </div>
</template>
