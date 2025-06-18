import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Usuario from './components/Usuario'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
