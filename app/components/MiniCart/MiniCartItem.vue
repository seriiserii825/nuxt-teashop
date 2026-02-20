<script setup lang="ts">
  import { cartService } from '~/api/services/cartService'
  import type { ICartItem } from '~/interfaces/ICart'

  const emits = defineEmits(['quantity-updated'])

  const props = defineProps({
    item: {
      type: Object as PropType<ICartItem>,
      required: true,
    },
  })

  const current_quantity = ref(props.item.quantity)

  async function setCartQuantity(cart_item_id: number, delta: number) {
    const new_quantity = current_quantity.value + delta
    console.log('new_quantity', new_quantity)
    if (new_quantity <= 0) return // Prevent negative quantity

    try {
      await cartService.update(cart_item_id, {
        quantity: new_quantity,
      })
      useSweetAlert('success', 'Quantity updated successfully')
      current_quantity.value = new_quantity
      emits('quantity-updated', { cart_item_id, new_quantity })
    } catch (error) {
      handleAxiosError(error)
    }
  }
</script>

<template>
  <div class="mb-6 flex gap-4">
    <!-- Product Image -->
    <div class="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-100 p-2">
      <img
        v-if="item.product.images && item.product.images[0]"
        :src="userGetServerUrl(item.product.images[0])"
        :alt="item.product.title"
        class="h-full w-full object-contain"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1">
      <h3 class="mb-1 font-semibold text-gray-900">{{ item.product.title }}</h3>
      <p class="mb-3 text-sm text-gray-600">
        {{ useFormatPrice(item.product.price) }}
      </p>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-3">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
          @click="setCartQuantity(item.id, -1)"
        >
          <IconIMinus />
        </button>
        <span class="min-w-[20px] text-center font-medium text-gray-900">{{
          current_quantity
        }}</span>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
          @click="setCartQuantity(item.id, 1)"
        >
          <IconIPlus />
        </button>
      </div>
    </div>
  </div>
</template>
