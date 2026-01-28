<script setup lang="ts">
  import { productService } from '~/api/services/productService'
  import { reviewService } from '~/api/services/reviewService'
  import type { IProduct } from '~/interfaces/IProduct'
  import type { IReview, IReviewCreate } from '~/interfaces/IReview'
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const store_id = useIdParamFromUrl()

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

  const initialData: IReviewCreate = {
    rating: 0,
    text: '',
    product_id: '',
  }

  const { form, send, pending } = useForm<IReviewCreate, IReview>(
    () => reviewService.create(initialData, store_id.value),
    initialData,
    () => {
      useSweetAlert('success', 'Review created successfully')
      navigateTo(`/store/${store_id.value}/reviews`)
    }
  )
</script>

<template>
  <div>
    <div class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.rating"
          label="Rating"
          name="form_rating"
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
        <Btn :loading="pending" @click="send">Create</Btn>
      </div>
    </div>
  </div>
</template>
