import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import { UserContext } from "../../context/profile.context";

function LoginPage() {

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const {getUserData} = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();


    // ... contactar al backend para validar credenciales de usuario aqui

    const userCredentials = {
      email,
      password
    }

    try {

      const response = await service.post(`/auth/login`, userCredentials)

      // 1. almacenamos el token en localStorage
      localStorage.setItem("authToken", response.data.authToken)

      // 2. crear el contexto y actualizar los estados del contexto
      await authenticateUser()

      // 3. redireccionamos al usuario a alguna pagina privada
          getUserData();
      navigate("/")
      
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // navigate a error
        navigate("/")
      }
    }

  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default LoginPage;