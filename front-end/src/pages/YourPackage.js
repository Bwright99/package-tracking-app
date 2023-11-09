import { useParams } from 'react-router-dom'

export default function YourPackage() {
  const { trackingNumber } = useParams()

  return (
    <div>
      <h1>Your Package!</h1>
      <p>Tracking Number: {trackingNumber}</p>
      {/* Display tracking information based on trackingNumber */}
    </div>
  )
}
