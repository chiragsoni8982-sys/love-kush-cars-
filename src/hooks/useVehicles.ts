import { useState, useEffect } from 'react'
import type { Vehicle } from '@/types'
import { mockVehicles } from '@/data/mockVehicles'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'

let cachedVehicles: Vehicle[] | null = null
let fetchPromise: Promise<Vehicle[]> | null = null

async function loadVehicles(): Promise<Vehicle[]> {
  if (cachedVehicles && cachedVehicles.length > 0) {
    return cachedVehicles
  }

  if (!fetchPromise) {
    fetchPromise = apiFetch<ApiVehicle[]>('/vehicles')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((raw, i) => mapApiVehicle(raw, i))
          cachedVehicles = mapped
          return mapped
        }
        cachedVehicles = mockVehicles
        return mockVehicles
      })
      .catch(() => {
        cachedVehicles = mockVehicles
        return mockVehicles
      })
      .finally(() => {
        fetchPromise = null
      })
  }

  return fetchPromise
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => cachedVehicles || mockVehicles)
  const [loading, setLoading] = useState<boolean>(!cachedVehicles)

  useEffect(() => {
    let isMounted = true
    loadVehicles().then((data) => {
      if (isMounted) {
        setVehicles(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  function getVehicleById(id: string): Vehicle | undefined {
    return vehicles.find((v) => String(v.id) === String(id))
  }

  return {
    vehicles,
    loading,
    getVehicleById,
  }
}
