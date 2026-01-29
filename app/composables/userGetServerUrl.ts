export default function userGetServerUrl(url: string): string {
  const config = useRuntimeConfig()
  const full_url = config.public.serverUploadsUrl + url
  console.log('full_url', full_url)
  return full_url
}
