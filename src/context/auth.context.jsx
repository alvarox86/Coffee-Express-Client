import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

// el componente que comparte los estados del contexto por toda la app
const AuthContext = createContext()


// el componente que almacena y controla los estados del contexto
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ rol, setRol ] = useState(null) //! solo si implementamos roles

  const [ isValidatingToken, setIsValidatingToken ] = useState(true)
  //false y null porque asumimos que es un extraño (quizas más adelante lo validemos)

  const authenticateUser = async () => {
    // funcion para validar el token del usuario y saber quien es y actualiza los estados
    try {
      
      const response = await service.get(`/auth/verify`)

      // si la llamada llega a este punto significa que el backend valido el token
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setRol(response.data.payload.rol)
      setIsValidatingToken(false)

    } catch (error) {
      console.log(error)

      // si la llamada llega a este punto significa que el token no existe, no es valido o expiró
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setRol(null)
      setIsValidatingToken(false)
    }

  }

  useEffect(() => {
    authenticateUser()
  }, [])

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    rol
  }

  if (isValidatingToken) {
    return (
      <h3>... validando usuario</h3>
    )
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}