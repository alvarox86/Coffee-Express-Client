import { Route, Routes } from 'react-router-dom'
import "./App.css"
import MyNavbar from './components/Navbar/MyNavbar'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/ErrorsPages/NotFoundPage'

function App() {
  return (
    <>
      <MyNavbar/>

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        

        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </>
  )
}

export default App
