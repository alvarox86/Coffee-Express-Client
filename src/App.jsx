import { Route, Routes } from 'react-router-dom'
import "./App.css"
import MyNavbar from './components/Navbar/MyNavbar'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/ErrorsPages/NotFoundPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import { useState } from 'react'

function App() {
   const [products, setProducts] = useState(null);

  return (
    <>
      <MyNavbar/>

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/products" element={<ProductsPage products={products} setProducts={setProducts}/>}/>
        <Route path='/products/:productId' element={<ProductDetailsPage/>}/>
        
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </>
  )
}

export default App
