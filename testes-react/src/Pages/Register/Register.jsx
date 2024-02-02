import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { auth } from "../../Firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"



const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if(email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth,email,password)
      .then(() => {
        navigate("/", {replace: true})
        alert("Cadastro criado com sucesso")
      })
      .catch((error) => {
        console.log("Erro ao cadastrar" + error)
      })
    }else {
      alert("Preencha todos os campos")
  }
}

  return (
    <div className="home-container">
      <h1>Cadastra-se</h1>
      <span>Vamos criar a sua conta</span>

      <form className="form" onSubmit={handleRegister}>
        <input 
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Cadastrar </button>
      </form>
      <Link className="button-link" to="/">
        Ja possui a sua conta? <span style={{color: "red"}}>faça um login</span> 
      </Link>
    </div>
  )   
}

export default Register