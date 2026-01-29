import type { components } from '~/generated/schema'

import type { IProduct } from './IProduct'

type ReviewSchema = components['schemas']['ReviewBasicDto']

export type IReview = ReviewSchema & {
  product: IProduct
}

export type IReviewCreate = components['schemas']['CreateReviewDto']
export type IReviewUpdate = components['schemas']['UpdateReviewDto']
