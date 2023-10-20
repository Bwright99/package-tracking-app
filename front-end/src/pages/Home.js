import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingResult, setTrackingResult] = useState('')

  const trackPackage = async () => {
    // const result = await apiCall(trackingNumber);
    // setTrackingResult(result);
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
        <Link to='/YourPackage'>
          <button onClick={trackPackage}>Track</button>
        </Link>
      ) : (
        <button disabled>Track</button>
      )}
      <div>{trackingResult}</div>
      <Link to='/packages'>View Your Packages</Link>
    </div>
  )
}
