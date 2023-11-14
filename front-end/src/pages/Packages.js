import React from 'react'
import { Link } from 'react-router-dom'
import { usePackages } from '../PackagesContext'

export default function Packages() {
  const { packages } = usePackages()

  return (
    <div>
      <h1>Packages</h1>
      {packages.map((trackingNumber, index) => (
        <p key={index}>
          <Link to={`/YourPackage/${trackingNumber}`}>{`Package ${
            index + 1
          }`}</Link>
        </p>
      ))}
    </div>
  )
}
