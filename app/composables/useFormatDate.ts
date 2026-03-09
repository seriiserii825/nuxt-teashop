export default function useFormatDate(dateString: string) {
  const normalized = dateString.endsWith('Z') || dateString.includes('+') ? dateString : dateString + 'Z'
  const date = new Date(normalized)

  const second = date.getSeconds().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}
