// composables/useClickOutside.ts
export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  function handler(event: PointerEvent) {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('pointerdown', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handler)
  })
}
