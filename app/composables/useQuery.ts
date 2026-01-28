export default function useQuery<TResult>(
  apiFn: (params?: Record<string, unknown>) => Promise<TResult>,
  options?: { immediate?: boolean; silent?: boolean }
) {
  const data = ref<TResult | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function fetch(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    try {
      data.value = await apiFn(params)
    } catch (e) {
      if (!options?.silent) {
        handleAxiosError(e)
      }
    } finally {
      loading.value = false
    }
  }

  if (options?.immediate !== false) {
    fetch()
  }

  return {
    data,
    error,
    loading,
    refetch: fetch,
  }
}
