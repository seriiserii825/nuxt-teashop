export interface IOrder {
  id: string
  createdAt: Date
  updatedAt: Date
  status: string
  userId: null
  items: OrderItem[]
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

export type IOrderCreate = Pick<IOrder, 'items'>
