import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function UserProfilePage() {
    const { isLoggedIn } = useContext(AuthContext);
    const { loggedUserId } = useContext(AuthContext);
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [userUserName, setUserUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAdress, setUserAdress] = useState(null)

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        const storedToken = localStorage.getItem("authToken");

        try {
            if(storedToken){
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${loggedUserId}`,{ headers: { Authorization: `Bearer ${storedToken}` } });
                console.log(response.data)
                setUserUserName(response.data.username);
                setUserProfilePicture(response.data.profilepicture);
                setUserPhone(response.data.phone)
                setUserAdress(response.data.adress)

            }        
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className="userProfileInfo">
    {isLoggedIn ? (
        
        <div>
            <p>{userUserName}</p>
            <img src={userProfilePicture} alt="foto perfil" className="" />
            <p>{userAdress}</p>
            <p>{userPhone}</p>
        </div>
    
    ):(
        <h2>No tienes permiso para ver esto</h2>
    )}

    </div>
  )
}

export default UserProfilePage