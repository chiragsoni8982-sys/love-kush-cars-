import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface CollectionsContextValue {
  wishlist: string[]
  compare: string[]
  toggleWishlist: (id: string) => void
  toggleCompare: (id: string) => boolean // returns false if cap reached
  isWishlisted: (id: string) => boolean
  isComparing: (id: string) => boolean
}

const COMPARE_CAP = 3
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

  useEffect(() => {
    localStorage.setItem('lk_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('lk_compare', JSON.stringify(compare))
  }, [compare])

  function toggleWishlist(id: string) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleCompare(id: string): boolean {
    let ok = true
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= COMPARE_CAP) {
        ok = false
        return prev
      }
      return [...prev, id]
    })
    return ok
  }

  return (
    <CollectionsContext.Provider
      value={{
        wishlist,
        compare,
        toggleWishlist,
        toggleCompare,
        isWishlisted: (id) => wishlist.includes(id),
        isComparing: (id) => compare.includes(id),
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
