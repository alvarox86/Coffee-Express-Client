import { useEffect, useState } from 'react'
import axios from 'axios';
import CartProductCard from '../../components/CartProductCard/CartProductCard';

function CartPage() {
 const [cartData, setCartData] = useState([])

  useEffect(() =>{
    getData()
  },[])

  const getData = async () => {
    const storedToken = localStorage.getItem("authToken");
    
    try {
      if(storedToken){
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/cart`,{ headers: { Authorization: `Bearer ${storedToken}` } });
        console.log(response.data)
        setCartData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='cartBox'>
      {cartData.map((eachCardData) =>{
        return(
          <div>
            <CartProductCard key={eachCardData._id} eachCardData={eachCardData}/>
          </div>
        )
      })}
    </div>
  )
}

export default CartPage