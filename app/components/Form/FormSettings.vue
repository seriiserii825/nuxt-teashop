<script setup lang="ts">
  import { storeService } from '~/api/services/storeService'
  import type { IStore, IStoreUpdate } from '~/interfaces/IStore'

  import FormTextarea from './FormTextarea.vue'

  const auth_store = useAuthStore()
  const stores = auth_store.user?.stores
  const current_store_param = useIdParamFromUrl()
  const current_store = computed(() =>
    stores?.find((store) => store.id === +current_store_param.value)
  )

  const initialData: IStoreUpdate = {
    title: current_store.value?.title || '',
    description: current_store.value?.description || '',
  }

  const { form, send, pending } = useForm<IStoreUpdate, IStore>(
    (data) => storeService.update(current_store_param.value || '', data),
    initialData,
    () => {
      useSweetAlert('success', 'Settings updated successfully!')
      navigateTo('/store')
    }
  )

  async function deleteStore() {
    const agree = await useSweetConfirm(
      'Are you sure you want to delete this store? This action cannot be undone.'
    )
    if (agree.isConfirmed) {
      try {
        await storeService.delete(current_store_param.value || '')
        useSweetAlert('success', 'Store deleted successfully!')
        navigateTo('/store')
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }
</script>

<template>
  <div class="flex w-full max-w-lg flex-col items-start gap-3">
    <FormInput v-model="form.title" name="settings_title" label="Store Title" />
    <FormTextarea
      v-model="form.description"
      label="Store Description"
      name="settings_description"
    />
    <div class="flex w-full justify-between">
      <Btn :loading="pending" @click="send"> Save Settings </Btn>
      <Btn variant="btn-danger" @click="deleteStore">Delete Store</Btn>
    </div>
  </div>
</template>
