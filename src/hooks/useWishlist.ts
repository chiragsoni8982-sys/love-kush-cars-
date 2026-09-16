import { useCollections } from '@/context/CollectionsContext'

export function useWishlist() {
  const { wishlist, toggleWishlist, isWishlisted } = useCollections()
  return { wishlist, toggleWishlist, isWishlisted }
}
