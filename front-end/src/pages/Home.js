import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)

  const trackPackage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:2000/trackers/search/results',
        { trackingNumber }
      )

      const trackingInfo = response.data

      setTrackingResult(trackingInfo)
    } catch (error) {
      console.error('API request error:', error)
    }
  }

  return (
    <div>
      <h1>Track Your Package</h1>
      <input
        type='text'
        placeholder='Enter tracking number'
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      {trackingNumber ? (
        <Link to={`/YourPackage/${trackingNumber}`}>
          <button onClick={trackPackage}>Track</button>
        </Link>
      ) : (
        <button disabled>Track</button>
      )}
    </div>
  )
}
