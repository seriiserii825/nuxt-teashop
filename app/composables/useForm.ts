import { FetchError } from "ofetch";

type Bug422 = Array<[string, string, Array<string | number>]>;

export default function useForm<TFormData extends Record<string, unknown>, TApiResult>(
  apiFn: (args: TFormData) => Promise<TApiResult>,
  formData: TFormData,
  onSuccess?: (args: TApiResult) => void
) {
  const form = reactive(formData);
  const errors = ref<Record<string, string>>({});
  const notice = ref<string | null>(null);
  const pending = ref(false);
  const success = ref(false);

  async function send() {
    errors.value = {};
    notice.value = null;
    pending.value = true;
    success.value = false;
    try {
      const res = await apiFn(formData);
      success.value = true;
      onSuccess && onSuccess(res);
    } catch (e) {
      if (e instanceof FetchError && e.status == 422) {
        const bug422 = e.data as Bug422;
        bug422.forEach((bug) => {
          if (bug[0] in form) {
            errors.value[bug[0]] = ruleToText(bug[1], bug[2]);
          }
        });
      } else {
        notice.value = "Unexpected error occurred. Please try again later.";
      }
    } finally {
      pending.value = false;
    }
  }
  return {
    form,
    errors,
    notice,
    pending,
    success,
    send,
  };
}
