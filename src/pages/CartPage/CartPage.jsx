import { useEffect, useState, useContext } from 'react'
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import service from '../../services/service.config';
import { UserContext } from '../../context/profile.context';

import "./CartPage.css"

function CartPage() {
 const [cartData, setCartData] = useState([])
 const { getUserData } =  useContext(UserContext)

  useEffect(() =>{
    getData()
  },[])

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");
    
    try {
      if(storedToken){
        const response = await service.get(`/user/cart`,{ headers: { Authorization: `Bearer ${storedToken}` } });
        setCartData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCartProduct = async (productId) =>{
    try {
      await service.patch(`/user/cart/${productId}/remove`)
        getData()
        getUserData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='cartBox'>
      {cartData.map((eachCardData) =>{
        return(
          <div>
            <CartProductCard key={eachCardData._id} eachCardData={eachCardData} handleDeleteCartProduct={handleDeleteCartProduct} />
          </div>
        )
      })}
    </div>
  )
}

export default CartPage