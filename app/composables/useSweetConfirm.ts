export default function useSweetConfirm(
  title: string,
  text = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  icon: 'warning' | 'question' = 'warning'
) {
  const nuxtApp = tryUseNuxtApp();

  if (!nuxtApp?.$swal) {
    console.warn('[SweetAlert CONFIRM]', title, text);
    return Promise.resolve({ isConfirmed: false });
  }

  return nuxtApp.$swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
  });
}
