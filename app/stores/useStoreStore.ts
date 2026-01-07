import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useStoreStore = defineStore(
  'store',
  () => {
    const store_id = ref('')
    function setStoreId(id: string) {
      store_id.value = id
    }
    return {
      store_id,
      setStoreId,
    }
  },
  {
    persist: true,
  }
)
