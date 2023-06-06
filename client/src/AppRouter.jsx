import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Appoinment from './pages/Appoinment'
import Diary from './pages/Diary'
import DashBoard from './pages/DashBoard'
import useToken from './components/useToken'
import Users from './pages/Users'

function AppRouter () {

  const {token, setToken} = useToken();
  console.log(token)
  if (!token) {
    console.log(!token)
    return <Login setToken={setToken}/>
  }
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path="/Appoinment" element={<Appoinment/>} />
        <Route path="/Diary" element={<Diary/>} />
        <Route path="/Users" element={<Users/>} />
        <Route path="/DashBoard" element={<DashBoard/>} />
      </Routes>
    </>
  )
}

export default AppRouter 
