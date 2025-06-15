import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function EditProfilePage() {
    /* const { isLoggedIn } = useContext(AuthContext); */
    const { loggedUserId } = useContext(AuthContext);
    const [userUserName, setuserUserName] = useState(undefined)
    const [userPhone, setUserPhone] = useState(undefined)
    const [userProfilePicture, setUserProfilePicture] = useState(undefined)
    const [userAdress, setUserAdress] = useState(undefined)


    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        const storedToken = localStorage.getItem("authToken");

        try {
            if(storedToken){
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${loggedUserId}`,{ headers: { Authorization: `Bearer ${storedToken}` } });
                setuserUserName(response.data.username)
                setUserPhone(response.data.phone)
                setUserProfilePicture(response.data.profilepicture)
                setUserAdress(response.data.adress)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="userProfileForm">
        <form>
            <h3>Update data</h3>
            
            <label>Username</label>
            <input type="text" required name="User name" value={userUserName}/>

            <label>Phone</label>
            <input type="text" required name="Phone" value={userPhone}/>

            <label>Adress</label>
            <input type="text" required name="Adress" value={userAdress}/>

            <label>Image</label>
            <input type="url" required name="Image" value={userProfilePicture}/>

        </form>
    </div>
  )
}

export default EditProfilePage