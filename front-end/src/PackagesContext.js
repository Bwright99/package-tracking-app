import React, { createContext, useContext, useState } from 'react'

const PackagesContext = createContext()

export const usePackages = () => useContext(PackagesContext)

export const PackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([])

  const addPackage = (trackingNumber) => {
    setPackages((prevPackages) => [...prevPackages, trackingNumber])
  }

  return (
    <PackagesContext.Provider value={{ packages, addPackage }}>
      {children}
    </PackagesContext.Provider>
  )
}
