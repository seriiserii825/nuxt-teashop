<script setup lang="ts">
  import { categoryService } from '~/api/services/categoryService'
  import { colorService } from '~/api/services/colorService'
  import { productService } from '~/api/services/productService'
  import type { ICategory } from '~/interfaces/ICategory'
  import type { IColor } from '~/interfaces/IColor'
  import type { IProduct, IProductUpdate } from '~/interfaces/IProduct'
  import type { ISelectOption } from '~/interfaces/ISelectOption'

  const emits = defineEmits(['emit_close'])

  const props = defineProps({
    productId: {
      type: String,
      required: true,
    },
  })

  const { data: product, loading: product_loading } = useQuery<IProduct>(() =>
    productService.getById(props.productId)
  )

  const initialData: IProductUpdate = {
    title: '',
    description: '',
    price: 0,
    categoryId: '',
    colorId: '',
  }

  watch(product, (newProduct) => {
    if (newProduct) {
      initialData.title = newProduct.title
      initialData.description = newProduct.description
      initialData.price = newProduct.price
      initialData.categoryId = newProduct.categoryId
      initialData.colorId = newProduct.colorId
    }
  })

  const { form, send, pending } = useForm<IProductUpdate, IProduct>(
    () => productService.update(props.productId, initialData),
    initialData,
    () => {
      useSweetAlert('success', 'Product updated successfully')
      emits('emit_close')
    }
  )

  const { data: categories, loading: categories_loading } = useQuery<
    ICategory[]
  >(categoryService.getAll)

  const categories_options = ref<ISelectOption[]>([])

  watch(categories, (newCategories) => {
    if (!newCategories) {
      useSweetAlert('error', 'Failed to load categories')
      emits('emit_close')
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
      emits('emit_close')
      return
    }

    colors_options.value = newColors.map((color: IColor) => ({
      value: color.id,
      text: color.name,
    }))
    form.colorId = String(colors_options.value[0]?.value) || ''
  })
</script>

<template>
  <div>
    <Preloader v-if="product_loading" />
    <div v-else class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.title"
          name="form_name"
          placeholder="Enter product title"
        />
        <FormTextarea
          v-model="form.description"
          name="form_description"
          placeholder="Enter product description"
          class="mt-4"
        />
        <FormInput
          v-model="form.price"
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
      </div>
      <Btn :loading="pending" class="mb-4 w-full" @click="send">Update</Btn>
    </div>
  </div>
</template>
