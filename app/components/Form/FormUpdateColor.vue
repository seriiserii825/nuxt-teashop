<script setup lang="ts">
  import { colorService } from '~/api/services/colorService'
  import type { IColor, IColorUpdate } from '~/interfaces/IColor'

  const props = defineProps({
    colorId: {
      type: String,
      required: true,
    },
  })

  const storeId = useIdParamFromUrl()

  const { data: color, loading: color_loading } = useQuery<IColor>(() =>
    colorService.getById(props.colorId)
  )

  const initialData: IColorUpdate = {
    name: '',
    value: '',
  }

  watch(color, (newColor) => {
    if (newColor) {
      initialData.name = newColor.name
      initialData.value = newColor.value
    }
  })

  const { form, send, pending } = useForm<IColorUpdate, IColor>(
    () => colorService.update(props.colorId, initialData),
    initialData,
    () => {
      useSweetAlert('success', 'Color updated successfully')
      navigateTo(`/store/${storeId.value}/colors`)
    }
  )
</script>

<template>
  <div>
    <Preloader v-if="color_loading" />
    <div v-else class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.name"
          name="form_name"
          placeholder="Enter color title"
        />
        <FormInput
          v-model="form.value"
          name="form_value"
          placeholder="Enter value (hex code)"
          class="mt-4"
        />
      </div>
      <Btn :loading="pending" class="mb-4 w-full" @click="send">Update</Btn>
    </div>
  </div>
</template>
