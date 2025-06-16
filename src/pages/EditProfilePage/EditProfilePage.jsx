import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, Link } from "react-router-dom";

function EditProfilePage() {
    const navigate = useNavigate()

    const { loggedUserId } = useContext(AuthContext);

    const [isUploading, setIsUploading] = useState(false);
    
    const [usernameInputValue, setUsernameInputValue] = useState("")
    const [phoneInputValue,setPhoneInputValue] = useState("")
    const [adressInputValue, setAdressInputValue] = useState("")
    const [imageUrl, setImageUrl] = useState(null); 

    const handleUsernameChange = (event) => {
        setUsernameInputValue(event.target.value)
    }
    const handlePhoneChange = (event)=>{
        setPhoneInputValue(event.target.value)
    }
    const handleAdressChange = (event) => {
        setAdressInputValue(event.target.value)
    }

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        const storedToken = localStorage.getItem("authToken");

        try {
            if(storedToken){
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`,{ headers: { Authorization: `Bearer ${storedToken}` } });
                setUsernameInputValue(response.data.username)
                setPhoneInputValue(response.data.phone)
                setAdressInputValue(response.data.adress)
                setImageUrl(response.data.profilepicture)
            }
        } catch (error) {
            console.log(error)
        }
    }

    /* if(userUserName === null || userPhone === null || userProfilePicture === null || userAdress === null){
        <CircularProgress />
    } */

    const handleSubmitForm = async (e) =>{
        e.preventDefault()
        const storedToken = localStorage.getItem("authToken");

        const updatedProfile = {
            username: usernameInputValue,
            phone: phoneInputValue,
            adress: adressInputValue,
            profilepicture: imageUrl
        }

        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/user`, updatedProfile,{ headers: { Authorization: `Bearer ${storedToken}` } })
            navigate(`/userprofile/${loggedUserId}`)
            
        } catch (error) {
            console.log(error)
        }   
    }

    const handleFileUpload = async (event) =>{

        if (!event.target.files[0]) {
            return;
        }

        setIsUploading(true)

        const uploadData = new FormData()
        uploadData.append("image", event.target.files[0] )

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/upload`, uploadData)

            setImageUrl(response.data.imageUrl)
            setIsUploading(false)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="userProfileForm">
        <form onSubmit={handleSubmitForm}>
            <h3>Update data</h3>
            
            <label>Username</label>
            <input type="text" required name="User name" onChange={handleUsernameChange} value={usernameInputValue}/>

            <label>Phone</label>
            <input type="text" required name="Phone" onChange={handlePhoneChange} value={phoneInputValue}/>

            <label>Adress</label>
            <input type="text" required name="Adress" onChange={handleAdressChange} value={adressInputValue}/>

            <label>Image</label>
            <input type="file" name="Image" onChange={handleFileUpload} disabled={isUploading}/>
            {isUploading ? <h3>... uploading image</h3> : null}
            {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

            <button type="submit">Edit profile</button>
        </form>
        <Link to={`/userprofile/${loggedUserId}`}>
            <button>
                Go back
            </button>
        </Link>
    </div>
  )
}

export default EditProfilePage