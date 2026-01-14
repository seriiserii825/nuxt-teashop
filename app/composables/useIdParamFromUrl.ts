export default function useIdParamFromUrl(id: string = 'id') {
  const route = useRoute()
  return computed(() =>
    id in route.params
      ? (route.params[id as keyof typeof route.params] as string)
      : ''
  )
}
