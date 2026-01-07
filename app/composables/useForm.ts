export default function useForm<TFormData extends object, TApiResult>(
  apiFn: (data: TFormData) => Promise<TApiResult>,
  formData: TFormData,
  onSuccess?: (result: TApiResult) => void
) {
  const form = reactive(formData) as TFormData
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
      const res = await apiFn(form) // передаём form, не formData
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
