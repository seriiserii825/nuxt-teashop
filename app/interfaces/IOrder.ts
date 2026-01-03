export interface IOrder {
  id: string
  createdAt: Date
  updatedAt: Date
  status: string
  userId: null
  orderItems: OrderItem[]
  total: number
}
export interface OrderItem {
  id: string
  createdAt: Date
  updatedAt: Date
  quantity: number
  price: number
  orderId: string
  productId: string
  storeId: string
}
