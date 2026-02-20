import type { components } from '~/generated/schema'

type CartSchema = components['schemas']['CartBaseDto']
type CartItemSchema = components['schemas']['CartItemDto']
type AddCartItemDto = components['schemas']['AddCartItemDto']
type UpdateCartSchema = components['schemas']['UpdateCartItemDto']

export type ICart = CartSchema
export type ICartItem = CartItemSchema
export type IAddCartItem = AddCartItemDto
export type IUpdateCart = UpdateCartSchema
