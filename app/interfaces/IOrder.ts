import type { components } from '~/generated/schema'

type OrderSchema = components['schemas']['OrderBasicDto']
type OrderItemSchema = components['schemas']['OrderItemsBasicDto']
type OrderCreateSchema = components['schemas']['CreateOrderDto']

export type IOrder = OrderSchema
export type IOrderItem = OrderItemSchema
export type IOrderCreate = OrderCreateSchema
