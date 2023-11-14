import { useParams } from 'react-router-dom'
import { usePackages } from '../PackagesContext'

export default function YourPackage() {
  const { trackingNumber } = useParams()
  const { addPackage } = usePackages()

  const handleAddToPackages = () => {
    addPackage(trackingNumber)
  }

  return (
    <div>
      <h1>Your Package!</h1>
      <p>Tracking Number: {trackingNumber}</p>
      <button onClick={handleAddToPackages}>Add to Packages</button>
    </div>
  )
}
