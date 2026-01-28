<script setup lang="ts">
  import { reviewService } from '~/api/services/reviewService'
  import type { IReview, IReviewCreate } from '~/interfaces/IReview'

  const store_id = useIdParamFromUrl()

  const initialData: IReviewCreate = {
    rating: 0,
    text: '',
    product_id: '',
    user_id: useGetUserFromStore().value?.id || '',
    store_id: store_id.value,
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
        <Btn :loading="pending" @click="send">Create</Btn>
      </div>
    </div>
  </div>
</template>
