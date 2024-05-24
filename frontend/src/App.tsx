import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Lobbby from './components/Lobbby'
import Room from './components/Room'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lobby' element={<Lobbby />} />
        <Route path='/room' element={<Room />} />

      </Routes>
    </>
  )
}

export default App
