<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import { reviewService } from '~/api/services/reviewService'
  import type { IProduct } from '~/interfaces/IProduct'
  import type { IReview, IReviewUpdate } from '~/interfaces/IReview'
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const props = defineProps({
    reviewId: {
      type: Number,
      required: true,
    },
  })

  const store_id = useIdParamFromUrl()

  const { data: review, loading: review_loading } = useQuery<IReview>(() =>
    reviewService.getById(props.reviewId, +store_id.value)
  )

  const initialData: IReviewUpdate = {
    rating: 0,
    text: '',
    product_id: 0,
  }

  watch(
    () => review.value,
    (newReview) => {
      if (newReview) {
        initialData.rating = newReview.rating
        initialData.text = newReview.text
        initialData.product_id = newReview.product_id
      }
    },
    { immediate: true }
  )

  const { data: products } = useQuery<IProduct[]>(() =>
    productService.getAllArray(+store_id.value)
  )

  const products_options = ref<ISelectOption[]>([])

  watch(
    products,
    (newProducts) => {
      if (newProducts && newProducts.length > 0) {
        products_options.value = newProducts.map((product) => ({
          text: product.title,
          value: product.id,
        }))
      }
    },
    { immediate: true }
  )

  const { form, send, pending } = useForm<IReviewUpdate, IReview>(
    () => reviewService.update(props.reviewId, +store_id.value, initialData),
    initialData,
    () => {
      useSweetAlert('success', 'Review updated successfully')
      navigateTo(`/store/${store_id.value}/reviews`)
    }
  )
</script>

<template>
  <div>
    <Preloader v-if="review_loading" />
    <div v-else class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.rating"
          label="Rating"
          name="form_rating"
          type="number"
          placeholder="Enter rating from 1 to 5"
        />
        <FormTextarea
          v-model="form.text"
          label="Text"
          name="form_text"
          placeholder="Enter your review here"
          class="mb-4 mt-4"
        />
        <FormSelect
          v-model="form.product_id"
          :options="products_options"
          label="Product"
          name="form_product"
          placeholder="Select a product"
          class="mb-4"
        />
        <Btn :loading="pending" @click="send">Update</Btn>
      </div>
    </div>
  </div>
</template>
