import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)

  //API CALLS NOT WORKING!!!

  const SHIP24_API_KEY = 'apik_DsPEC260ZeGWNhFmRnTWLTXsmZQa8F'

  const SHIP24_API_ENDPOINT = 'https://api.ship24.com/public/v1/trackers'

  const headers = {
    Authorization: `Bearer ${SHIP24_API_KEY}`,
    'Content-Type': 'application/json; charset=utf-8',
  }

  const config = { headers }

  const trackPackage = async () => {
    try {
      const response = await axios.get(
        `${SHIP24_API_ENDPOINT}/${trackingNumber}`,
        config
      )

      const trackingInfo = response.data

      setTrackingResult(trackingInfo)
    } catch (error) {
      console.error('API request error:', error)
    }
  }

  //Should store tracking number fine and redirect to other page fine. I think.

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
