import { Link } from 'react-router-dom'

import PackagesBE from "../PackagesFOR_BACKEND_USE"

export default function Packages() {
  return (
    <div>
      <h1>Packages</h1>
      <Link to='/YourPackage'>Package 1</Link>
      {/* The code below can be commented out. It was put here
      to check that it was connected to backend */}
      <PackagesBE />
    </div>
  )
}
