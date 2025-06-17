import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./UserProfilePage.css"
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";

function UserProfilePage() {
    const params = useParams()
    const { isLoggedIn } = useContext(AuthContext);
    const { loggedUserId } = useContext(AuthContext);
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [userUserName, setUserUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAdress, setUserAdress] = useState(null)

    useEffect(()=>{
        getData()
    },[params])

    const getData = async () => {
        const storedToken = localStorage.getItem("authToken");

        try {
            if(storedToken){
                const response = await service.get(`/user`,{ headers: { Authorization: `Bearer ${storedToken}` } });
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
            <div className="userProfileData">
                <div>
                    <img src={userProfilePicture} alt="foto perfil" className="userIcon" />
                </div>
                <div className="userTextInfo">
                    <p>{userUserName}</p>
                    <p>{userAdress}</p>
                    <p>{userPhone}</p>
                </div>
             </div>

            <div className="btnEditProfile">
                <Link to={`/editprofile/${loggedUserId}`}>
                    <button>Edit profile</button>
                </Link>
            </div>
        </div>
    ):(
        <h2>No tienes permiso para ver esto</h2>
    )}
    </div>
  )
}

export default UserProfilePage