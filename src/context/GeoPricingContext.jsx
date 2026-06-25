import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DEFAULT_COUNTRY = 'IN'
const DEFAULT_PRICE = '₹500'

const GeoPricingContext = createContext({
  country: DEFAULT_COUNTRY,
  demoPrice: DEFAULT_PRICE,
  isLoading: true,
})

function getDemoPrice(country) {
  return country === 'IN' ? '₹500' : '$10'
}

export function GeoPricingProvider({ children }) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/geo')
      .then((response) => {
        if (!response.ok) throw new Error('Geo lookup failed')
        return response.json()
      })
      .then((data) => {
        setCountry(data?.country || DEFAULT_COUNTRY)
      })
      .catch(() => {
        setCountry(DEFAULT_COUNTRY)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const value = useMemo(
    () => ({
      country,
      demoPrice: getDemoPrice(country),
      isLoading,
    }),
    [country, isLoading],
  )

  return (
    <GeoPricingContext.Provider value={value}>{children}</GeoPricingContext.Provider>
  )
}

export function useGeoPricing() {
  const context = useContext(GeoPricingContext)

  if (!context) {
    throw new Error('useGeoPricing must be used within a GeoPricingProvider')
  }

  return context
}
