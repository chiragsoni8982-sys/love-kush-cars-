import { useCollections, COMPARE_CAP } from '@/context/CollectionsContext'

export function useCompare() {
  const {
    compare,
    toggleCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    replaceCompare,
    isComparing,
    toast,
    hideToast,
    showToast,
  } = useCollections()

  return {
    compare,
    toggleCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    replaceCompare,
    isComparing,
    toast,
    hideToast,
    showToast,
    maxCap: COMPARE_CAP,
  }
}

