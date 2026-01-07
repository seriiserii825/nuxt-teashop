<script setup lang="ts">
  import { storeService } from '~/api/services/storeService'
  import type { IStore, IStoreCreate } from '~/interfaces/IStore'

  const store = useStoreStore()

  const auth_store = useAuthStore()
  const stores = computed(() => {
    if (auth_store.user && auth_store.user.stores) {
      return auth_store.user.stores
    }
    return []
  })
  const store_param_id = useIdParamFromUrl()
  const stores_options = computed(() => {
    if (!stores.value) {
      return []
    }
    return stores.value.map((store: IStore) => ({
      value: store.id,
      text: store.title,
    }))
  })
  const selectedStore = ref<string>('')

  //watch store_param_id changed
  watch(store_param_id, (new_store_param_id) => {
    if (new_store_param_id) {
      selectedStore.value = new_store_param_id
    }
  })

  watch(
    stores_options,
    (options) => {
      if (options.length && options[0] && !selectedStore.value) {
        selectedStore.value = store_param_id.value || options[0].value
      }
    },
    { immediate: true }
  )

  watch(selectedStore, (new_store_id) => {
    if (new_store_id) {
      navigateTo(`/store/${new_store_id}`)
      store.setStoreId(new_store_id)
    }
  })

  const is_opened_popup = ref(false)

  function closePopup() {
    is_opened_popup.value = false
  }

  function submitStore() {
    send().then(() => {
      closePopup()
    })
  }

  const initalData: IStoreCreate = {
    title: '',
  }

  const { form, send, pending } = useForm<IStoreCreate, IStore>(
    (data) => storeService.create(data),
    initalData,
    () => {
      useSweetAlert('success', 'Store created successfully')
      useFetchProfileToPinia()
    }
  )
</script>

<template>
  <div>
    <FormSelectComplex
      v-model="selectedStore"
      :icon="['fas', 'store']"
      :options="stores_options"
      @close-dropdown="is_opened_popup = true"
    />
    <Popup v-if="is_opened_popup" title="Switch Store" @emit_close="closePopup">
      <FormInput
        v-model="form.title"
        name="store_title"
        placeholder="Enter store title"
      />
      <Btn
        :pending="pending"
        :disabled="form.title === ''"
        class="mt-4 w-full"
        @click="submitStore"
      >
        Create new store
      </Btn>
    </Popup>
  </div>
</template>
