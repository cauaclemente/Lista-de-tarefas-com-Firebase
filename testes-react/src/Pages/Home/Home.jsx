import "./Home.css"
import { useState } from "react"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { auth } from "../../Firebase"
import { signInWithEmailAndPassword } from "firebase/auth"




const Home = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if(email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("./Admin", {replace:true})
      })

      .catch((error) => {
        console.log("Erro ao fazer login" + error)
      })
    }else {
      alert("Preencha todos os campos")
  }
}

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className="form" onSubmit={handleLogin}>
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
        <button type="submit"> Acessar </button>
      </form>
      <Link className="button-link" to="/register">
        Não possui uma conta? <span style={{color: "red"}}> Cadastre-se </span> 
      </Link>
    </div>
  )   
}

export default Home