export default function useSweetAlert(
  icon: "success" | "error" | "warning" | "info" | "question",
  title: string,
  text = ""
) {
  // Use tryUseNuxtApp to safely get the nuxt context
  const nuxtApp = tryUseNuxtApp();

  if (nuxtApp?.$swal) {
    return nuxtApp.$swal.fire({
      toast: true,
      position: "bottom-end",
      icon,
      title,
      text,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      theme: "dark",
    });
  } else {
    // Fallback for when plugin isn't loaded yet
    console.warn("[SweetAlert]", title, text);
    return Promise.resolve();
  }
}
