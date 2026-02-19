<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import type { ICategory, ICategoryUpdate } from '~/interfaces/ICategory'

  const emits = defineEmits(['emit_close'])

  const props = defineProps({
    categoryId: {
      type: Number,
      required: true,
    },
  })

  const { $routes } = useNuxtApp()

  const storeId = useIdParamFromUrl()

  const { data: category, loading: category_loading } = useQuery<ICategory>(
    () => categoryService.getById(props.categoryId, +storeId.value)
  )

  const initialData: ICategoryUpdate = {
    title: '',
    description: '',
  }

  watch(
    () => category.value,
    (newCategory) => {
      if (newCategory) {
        initialData.title = newCategory.title
        initialData.description = newCategory.description
      }
    },
    { immediate: true }
  )

  const { form, send, pending } = useForm<ICategoryUpdate, ICategory>(
    () => categoryService.update(props.categoryId, initialData, +storeId.value),
    initialData,
    () => {
      useSweetAlert('success', 'Category updated successfully')
      emits('emit_close')
      navigateTo($routes.store_admin_categories(+storeId.value))
    }
  )
</script>

<template>
  <div>
    <Preloader v-if="category_loading" />
    <div v-else class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.title"
          name="form_name"
          placeholder="Enter category title"
        />
        <FormTextarea
          v-model="form.description"
          name="form_description"
          placeholder="Enter category description"
          class="mb-4 mt-4"
        />
      </div>
      <Btn :loading="pending" class="mb-4" @click="send">Update</Btn>
    </div>
  </div>
</template>
