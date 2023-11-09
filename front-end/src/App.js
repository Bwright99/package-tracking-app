import React, { useState } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import Home from './pages/Home'
import Packages from './pages/Packages'
import YourPackage from './pages/YourPackage'

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/packages' element={<Packages />} />
          <Route path='/YourPackage/:trackingInfo' element={<YourPackage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
