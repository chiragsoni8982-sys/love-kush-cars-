export const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000'

/**
 * Ensures relative image URLs starting with /uploads/...
 * resolve to the full backend API host.
 */
export function resolveImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url
  }
  const cleanBase = API_BASE_URL.replace(/\/+$/, '')
  const cleanPath = url.replace(/^\/+/, '')
  return `${cleanBase}/${cleanPath}`
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanBase = API_BASE_URL.replace(/\/+$/, '')
  const cleanEndpoint = endpoint.replace(/^\/+/, '')
  const url = `${cleanBase}/${cleanEndpoint}`

  const isFormData = typeof FormData !== 'undefined' && options?.body instanceof FormData

  const headers: Record<string, string> = {}

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  // Auto-inject admin token if present in localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('lk_admin_token') : null
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (options?.headers) {
    Object.assign(headers, options.headers)
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`
    try {
      const errorJson = await response.json()
      if (errorJson?.detail) {
        errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail)
      } else if (errorJson?.message) {
        errorDetail = errorJson.message
      }
    } catch {
      const text = await response.text().catch(() => '')
      if (text) errorDetail = text
    }
    throw new Error(errorDetail)
  }

  // Handle empty responses or 204 No Content
  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}
