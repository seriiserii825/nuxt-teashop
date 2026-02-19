<script setup lang="ts">
  import { colorService } from '~/api/services/colorService'
  import type { IColor, IColorCreate } from '~/interfaces/IColor'

  const { $routes } = useNuxtApp()

  const storeId = useIdParamFromUrl()

  const initialData: IColorCreate = {
    name: '',
    value: '',
  }

  const { form, send, pending } = useForm<IColorCreate, IColor>(
    () => colorService.create(initialData, storeId.value),
    initialData,
    () => {
      useSweetAlert('success', 'Color created successfully')
      navigateTo($routes.store_admin_colors(+storeId.value))
    }
  )
</script>

<template>
  <div>
    <div class="rounded border p-8">
      <div class="mb-4">
        <FormInput
          v-model="form.name"
          label="Name"
          name="form_name"
          placeholder="Enter color title"
        />
        <FormInput
          v-model="form.value"
          label="Value"
          name="form_price"
          placeholder="Enter value (hex code)"
          class="mt-4"
        />
      </div>
      <Btn :loading="pending" @click="send">Create</Btn>
    </div>
  </div>
</template>
