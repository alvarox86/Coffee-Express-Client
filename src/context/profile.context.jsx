import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

const UserContext = createContext()

function UserWrapper(props){
    const [userName, setUserName] = useState(null)
    const [userImgUrl, setUserImgUrl] = useState(null)
    const [userCart, setUserCart] = useState(null)

    const getUserData = async () =>{
        try {
            const response = await service.get(`/user`)

            setUserName(response.data.username)
            setUserCart(response.data.cart.length)
            setUserImgUrl(response.data.profilepicture)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

    const passedContext = {
        userName,
        userImgUrl,
        userCart,
        setUserCart,
        getUserData
    }

    return(
        <UserContext.Provider value={passedContext}>
            {props.children}
        </UserContext.Provider>
    )
}

export {
  UserContext,
  UserWrapper
}