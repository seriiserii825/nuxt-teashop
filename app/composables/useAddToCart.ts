import { cartService } from '~/api/services/cartService'

export default function useAddToCart() {
  const mini_cart_store = useMiniCartStore()

  async function addToCart(product_id: number) {
    try {
      await cartService.add({
        product_id,
        quantity: 1,
      })
      const cart = await cartService.get()
      mini_cart_store.setCart(cart)

      useSweetAlert('success', 'Product added to cart!')
    } catch (error) {
      handleAxiosError(error)
    }
  }

  return { addToCart }
}
