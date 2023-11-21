import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Context ,useProducts } from './app/AppContext'

function App() {
  
  return (
    <>
    <Context.Provider value={useProducts()}>
      <div>
      <Navbar/>   
      </div>
      </Context.Provider>
    </>
  )
}

export default App
