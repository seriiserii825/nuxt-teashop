export default function useIdParamFromUrl() {
  const route = useRoute()
  return computed(() =>
    'id' in route.params ? (route.params.id as string) : ''
  )
}
