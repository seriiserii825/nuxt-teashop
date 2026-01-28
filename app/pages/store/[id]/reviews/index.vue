<script setup lang="ts">
  import { reviewService } from '~/api/services/reviewService'
  import type { TableColumn } from '~/components/DataTable.vue'
  import type { IReview } from '~/interfaces/IReview'
  import type { TSortColumn } from '~/interfaces/TSortColumn'

  definePageMeta({
    layout: 'store',
  })

  const selected_review_id = ref<string | null>(null)
  const row_action = ref<'edit' | 'delete' | null>(null)
  const sortKey = ref<string>('') // Добавлено
  const sortOrder = ref<'asc' | 'desc'>('desc') // Добавлено
  const store_id = useIdParamFromUrl()

  const {
    data: response,
    loading,
    refetch,
  } = useQuery<IReview[]>(() => reviewService.getAll(+store_id.value))

  const columns = ref<TableColumn[]>([
    { key: 'id', label: 'ID' },
    { key: 'rating', label: 'Rating' },
    { key: 'store', label: 'Store Id' },
  ])

  const reviews = computed(() => {
    if (!response.value) return []
    return response.value.map((review: IReview) => ({
      ...review,
      store: review.store.title,
    }))
  })

  function editRow(review_id: number) {
    const url = `/store/${store_id.value}/reviews/${review_id}/edit`
    navigateTo(url)
  }
  async function deleteRow(id: string) {
    selected_review_id.value = id
    row_action.value = 'delete'
    const confirmed = await useSweetConfirm(
      'Are you sure you want to delete this review?'
    )
    if (confirmed.isConfirmed) {
      try {
        await reviewService.delete(selected_review_id.value, +store_id.value)
        useSweetAlert('success', 'Review deleted successfully')
        selected_review_id.value = null
        row_action.value = null
        refetch()
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }

  function closePopup() {
    selected_review_id.value = null
    row_action.value = null
    refetch()
  }

  function sortColumn(column: TSortColumn) {
    sortKey.value = column.key
    sortOrder.value = column.order
    refetch()
  }

  function goToCreateReviewPage() {
    const current_store_id = useIdParamFromUrl()
    navigateTo(`/store/${current_store_id.value}/reviews/create`)
  }
</script>

<template>
  <div class="p-4">
    <Heading
      mb-4
      title="Reviews"
      description="All shop reviews"
      button-text="Create"
      :icon="['fas', 'plus']"
      @btn_click="goToCreateReviewPage"
    />
    <Preloader v-if="loading" />
    <DataTable
      v-else-if="response && reviews.length"
      :columns="columns"
      :data="reviews"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      :show-pagination="false"
      @edit-row="editRow"
      @delete-row="deleteRow"
      @sort="sortColumn"
    />
    <div v-else class="text-center text-gray-500">No reviews found.</div>
    <Popup
      v-if="selected_review_id && row_action === 'edit'"
      title="Edit review"
      @emit_close="closePopup"
    >
      <!-- <FormUpdateReview -->
      <!--   :review-id="selected_review_id" -->
      <!--   @emit_close="closePopup" -->
      <!-- /> -->
    </Popup>
  </div>
</template>
