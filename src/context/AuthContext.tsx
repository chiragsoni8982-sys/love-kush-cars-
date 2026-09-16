import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiFetch, API_BASE_URL } from '@/lib/api'
import type { AdminUser } from '@/types'

interface AuthContextValue {
  admin: AdminUser | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'lk_admin_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  })
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Verify token validity on initial mount
  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      const storedToken = localStorage.getItem(TOKEN_KEY)
      if (!storedToken) {
        if (isMounted) {
          setAdmin(null)
          setToken(null)
          setIsLoading(false)
        }
        return
      }

      try {
        const adminData = await apiFetch<AdminUser>('/auth/me')
        if (isMounted) {
          setAdmin(adminData)
          setToken(storedToken)
        }
      } catch {
        // Token invalid or expired
        if (isMounted) {
          localStorage.removeItem(TOKEN_KEY)
          setToken(null)
          setAdmin(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  async function login(username: string, password: string): Promise<void> {
    setIsLoading(true)
    try {
      const body = new URLSearchParams()
      body.append('username', username.trim())
      body.append('password', password)

      const cleanBase = API_BASE_URL.replace(/\/+$/, '')
      const response = await fetch(`${cleanBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      if (!response.ok) {
        let errorMsg = 'Invalid credentials'
        try {
          const errJson = await response.json()
          if (errJson?.detail) {
            errorMsg = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail)
          }
        } catch {
          // ignore
        }
        throw new Error(errorMsg)
      }

      const data = await response.json()
      const newToken = data.access_token

      localStorage.setItem(TOKEN_KEY, newToken)
      setToken(newToken)

      // Fetch admin details
      const userRes = await apiFetch<AdminUser>('/auth/me', {
        headers: { Authorization: `Bearer ${newToken}` },
      })
      setAdmin(userRes)
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        isAuthenticated: !!token && !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
