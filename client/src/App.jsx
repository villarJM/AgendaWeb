import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Appoinment from './pages/Appoinment'
import Diary from './pages/Diary'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Appoinment" element={<Appoinment/>} />
          <Route path="/Diary" element={<Diary/>} />
        </Routes>
    </>
  )
}

export default App
