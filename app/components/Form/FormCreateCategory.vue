<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import type { ICategory, ICategoryCreate } from '~/interfaces/ICategory'

  const storeId = useIdParamFromUrl()

  const initialData: ICategoryCreate = {
    title: '',
    description: '',
  }

  const { form, send, pending } = useForm<ICategoryCreate, ICategory>(
    () => categoryService.create(initialData, storeId.value),
    initialData,
    () => {
      useSweetAlert('success', 'Category created successfully')
      navigateTo(`/store/${storeId.value}/categories`)
    }
  )
</script>

<template>
  <div>
    <div class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.title"
          label="Title"
          name="form_name"
          placeholder="Enter product title"
        />
        <FormTextarea
          v-model="form.description"
          label="Description"
          name="form_description"
          placeholder="Enter product description"
          class="mt-4 mb-4"
        />
        <Btn :loading="pending" @click="send">Create</Btn>
      </div>
    </div>
  </div>
</template>
