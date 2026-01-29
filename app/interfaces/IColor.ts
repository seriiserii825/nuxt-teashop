import type { components } from '~/generated/schema'

type ColorSchema = components['schemas']['ColorBasicDto']

export type IColor = ColorSchema

export type IColorCreate = components['schemas']['CreateColorDto']
export type IColorUpdate = components['schemas']['UpdateColorDto']
