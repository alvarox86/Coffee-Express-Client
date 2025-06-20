import { Route, Routes } from 'react-router-dom'
import "./App.css"
import MyNavbar from './components/Navbar/MyNavbar'
import MyFooter from './components/Footer/MyFooter'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/ErrorsPages/NotFoundPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import { useState } from 'react'
import CartPage from './pages/CartPage/CartPage'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import ModifyProductPage from './pages/ModifyProductPage/ModifyProductPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ServerErrorPage from './pages/ErrorsPages/ServerErrorPage'
import UnderConstruction from './pages/ErrorsPages/UnderConstruction'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'

function App() {
   const [products, setProducts] = useState([]);
   const [searchProducts, setSearchProducts] = useState("");

  return (
    <div className='app-container'>
      <MyNavbar products={products} setProducts={setProducts} setSearchProducts={setSearchProducts}/>

      <main className='mainContent'>
        <Routes>
         <Route path='/' element={<HomePage />} />
         <Route path='/signup' element={<SignupPage/>} />
         <Route path='/login' element={<LoginPage/>} />
         <Route path='/userprofile/:userId' element={<UserProfilePage/>} />
         <Route path='/editprofile/:userId' element={<EditProfilePage/>} /> 
         <Route path="/products" element={<ProductsPage products={products} setProducts={setProducts} searchProducts={searchProducts}/>}/>
         <Route path='/products/:productId' element={<ProductDetailsPage products={products} setProducts={setProducts}/>}/>
         <Route path='/create-product' element={<CreateProduct/>}/>
         <Route path='/products/:productId/modify' element={<ModifyProductPage/>}/>
         <Route path='/cart' element={<CartPage/>}/>
         <Route path='/aboutus' element={<AboutPage/>}/>
          <Route path="/payment-success" element={ <PaymentSuccess/> }/>

        {/*ERROR ROUTES */}
        <Route path='*' element={<NotFoundPage/>} />
        <Route path="/error" element={<ServerErrorPage/>}/>
        <Route path="/under-construction" element={<UnderConstruction/>}/>
      </Routes>
      </main >
      <MyFooter/>
    </div>
  )
}

export default App
