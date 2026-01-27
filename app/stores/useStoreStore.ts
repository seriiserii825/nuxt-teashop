import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useStoreStore = defineStore(
  'store',
  () => {
    const store_id = ref(0)
    function setStoreId(id: number) {
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
