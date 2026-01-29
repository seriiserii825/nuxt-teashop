export default function userGetServerUrl(url: string): string {
  const config = useRuntimeConfig()
  const full_url = config.public.serverUploadsUrl + url
  return full_url
}
