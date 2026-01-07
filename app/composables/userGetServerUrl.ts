export default function userGetServerUrl(url: string): string {
  const config = useRuntimeConfig()
  return config.public.serverUrl + url
}
