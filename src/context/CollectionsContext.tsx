import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CompareToast {
  id: number
  message: string
  type?: 'info' | 'success' | 'warning'
  actionUrl?: string
  actionLabel?: string
}

interface CollectionsContextValue {
  wishlist: string[]
  compare: string[]
  toggleWishlist: (id: string) => void
  toggleCompare: (id: string, name?: string) => boolean
  addToCompare: (id: string, name?: string) => boolean
  removeFromCompare: (id: string, name?: string) => void
  clearCompare: () => void
  replaceCompare: (oldId: string, newId: string) => void
  isWishlisted: (id: string) => boolean
  isComparing: (id: string) => boolean
  toast: CompareToast | null
  hideToast: () => void
  showToast: (message: string, type?: 'info' | 'success' | 'warning', actionUrl?: string, actionLabel?: string) => void
}

export const COMPARE_CAP = 3
const CollectionsContext = createContext<CollectionsContextValue | null>(null)

function readStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage('lk_wishlist'))
  const [compare, setCompare] = useState<string[]>(() => readStorage('lk_compare'))
  const [toast, setToast] = useState<CompareToast | null>(null)

  useEffect(() => {
    localStorage.setItem('lk_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('lk_compare', JSON.stringify(compare))
  }, [compare])

  function showToast(
    message: string,
    type: 'info' | 'success' | 'warning' = 'info',
    actionUrl?: string,
    actionLabel?: string,
  ) {
    setToast({
      id: Date.now(),
      message,
      type,
      actionUrl,
      actionLabel,
    })
  }

  function hideToast() {
    setToast(null)
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        showToast('Removed from wishlist', 'info')
        return prev.filter((x) => x !== id)
      } else {
        showToast('Added to your saved wishlist', 'success', '/wishlist', 'View Wishlist')
        return [...prev, id]
      }
    })
  }

  function addToCompare(id: string, name?: string): boolean {
    if (compare.includes(id)) return true
    if (compare.length >= COMPARE_CAP) {
      showToast(
        `Comparison limit reached (${COMPARE_CAP} cars max). Please remove a car to compare this one.`,
        'warning',
        '/compare',
        'View Compare',
      )
      return false
    }

    const next = [...compare, id]
    setCompare(next)
    showToast(
      `Added ${name ? `"${name}"` : 'car'} to comparison (${next.length}/${COMPARE_CAP})`,
      'success',
      '/compare',
      'Compare Now',
    )
    return true
  }

  function removeFromCompare(id: string, name?: string) {
    setCompare((prev) => prev.filter((x) => x !== id))
    showToast(`Removed ${name ? `"${name}"` : 'car'} from comparison`, 'info')
  }

  function clearCompare() {
    setCompare([])
    showToast('Comparison list cleared', 'info')
  }

  function replaceCompare(oldId: string, newId: string) {
    setCompare((prev) => {
      if (prev.includes(newId)) return prev.filter((x) => x !== oldId)
      return prev.map((x) => (x === oldId ? newId : x))
    })
  }

  function toggleCompare(id: string, name?: string): boolean {
    if (compare.includes(id)) {
      removeFromCompare(id, name)
      return true
    } else {
      return addToCompare(id, name)
    }
  }

  return (
    <CollectionsContext.Provider
      value={{
        wishlist,
        compare,
        toggleWishlist,
        toggleCompare,
        addToCompare,
        removeFromCompare,
        clearCompare,
        replaceCompare,
        isWishlisted: (id) => wishlist.includes(id),
        isComparing: (id) => compare.includes(id),
        toast,
        hideToast,
        showToast,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

export function useCollections() {
  const ctx = useContext(CollectionsContext)
  if (!ctx) throw new Error('useCollections must be used within CollectionsProvider')
  return ctx
}
