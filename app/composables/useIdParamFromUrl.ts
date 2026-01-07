export default function useIdParamFromUrl() {
  const route = useRoute()
  return 'id' in route.params ? (route.params.id as string) : ''
}
