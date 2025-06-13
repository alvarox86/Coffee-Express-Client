import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import { Link } from "react-router-dom";

function SignupPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {

      const newUser = {
        email,
        username,
        password
      }
      
      const response = await service.post(`/auth/signup`, newUser)

      console.log("todo bien, el backend respondio", response)
      navigate("/login")

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        // esto es para que los errores de cliente (400) los podamos mostrar al usuario
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // navigate a pagina de error
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
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

        <button type="submit">Registrar</button>

        { errorMessage && <p>{errorMessage}</p> }

      </form>
        <p>Do you already have an account</p>
      <Link to={"/login"}>
        <p>login</p>
      </Link>
      
    </div>
  );
}

export default SignupPage;