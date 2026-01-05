export default function useForm<
  TFormData extends Record<string, unknown>,
  TApiResult,
>(
  apiFn: (args: TFormData) => Promise<TApiResult>,
  formData: TFormData,
  onSuccess?: (args: TApiResult) => void
) {
  const form = reactive(formData)
  const errors = ref<Record<string, string>>({})
  const notice = ref<string | null>(null)
  const pending = ref(false)
  const success = ref(false)

  async function send() {
    errors.value = {}
    notice.value = null
    pending.value = true
    success.value = false
    try {
      const res = await apiFn(formData)
      success.value = true
      if (onSuccess) {
        onSuccess(res)
      }
    } catch (e) {
      handleAxiosError(e)
    } finally {
      pending.value = false
    }
  }
  return {
    form,
    errors,
    notice,
    pending,
    success,
    send,
  }
}
