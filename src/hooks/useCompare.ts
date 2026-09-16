import { useCollections } from '@/context/CollectionsContext'

export function useCompare() {
  const { compare, toggleCompare, isComparing } = useCollections()
  return { compare, toggleCompare, isComparing }
}
