<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import { colorService } from '~/api/services/colorService'
  import { productService } from '~/api/services/productService'
  import type { ICategory } from '~/interfaces/ICategory'
  import type { IColor } from '~/interfaces/IColor'
  import type { IFileUpload } from '~/interfaces/IFileUpload'
  import type { IProduct, IProductCreate } from '~/interfaces/IProduct'
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const emits = defineEmits(['emit_close'])

  const storeId = useIdParamFromUrl()

  const initialData: IProductCreate = {
    title: '',
    description: '',
    images: [],
    price: 0,
    categoryId: '',
    colorId: '',
  }

  const { form, send, pending } = useForm<IProductCreate, IProduct>(
    () => productService.create(initialData, storeId.value),
    initialData,
    () => {
      useSweetAlert('success', 'Product created successfully')
      navigateTo(`/store/${storeId.value}/products`)
    }
  )

  const { data: categories, loading: categories_loading } = useQuery<
    ICategory[]
  >(categoryService.getAll)

  const categories_options = ref<ISelectOption[]>([])

  watch(categories, (newCategories) => {
    if (!newCategories) {
      useSweetAlert('error', 'Failed to load categories')
      return
    }

    categories_options.value = newCategories.map((category: ICategory) => ({
      value: category.id,
      text: category.title,
    }))
  })

  const { data: colors, loading: colors_loading } = useQuery<IColor[]>(
    colorService.getAll
  )

  const colors_options = ref<ISelectOption[]>([])
  watch(colors, (newColors) => {
    if (!newColors) {
      useSweetAlert('error', 'Failed to load colors')
      return
    }

    colors_options.value = newColors.map((color: IColor) => ({
      value: color.id,
      text: color.name,
    }))
  })

  function emitUploadImages(images: IFileUpload[]) {
    form.images = images.map((img) => img.url)
  }
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
          class="mt-4"
        />
        <FormInput
          v-model="form.price"
          label="Price"
          name="form_price"
          placeholder="Enter price"
          class="mt-4"
        />
        <Preloader v-if="categories_loading" />
        <FormSelect
          v-else
          v-model="form.categoryId"
          label="Category"
          :options="categories_options"
          name="form_category"
          :required="true"
          placeholder="Select category"
          class="mt-4"
        />
        <Preloader v-if="colors_loading" />
        <FormSelect
          v-else
          v-model="form.colorId"
          label="Color"
          :options="colors_options"
          name="form_color"
          :required="true"
          placeholder="Select color"
          class="mt-4"
        />
        <FileUpload
          v-model="form.images"
          label="Images"
          name="form_images"
          class="mt-4"
          @emit-uploaded="emitUploadImages"
        />
      </div>
      <Btn :loading="pending" class="mb-4 w-full" @click="send">Create</Btn>
    </div>
  </div>
</template>
