import "./admin.css"
import { useState } from "react"

import { auth } from "../../Firebase"
import { signOut } from "firebase/auth"

const Admin = () => {
  
    const [tarefaInput, setTarefaInput] = useState("")

    function handleRegister(e) {
        e.preventDefault();
        alert("clicou")
    }

    async function handleLogout() {
        await signOut(auth)
    }


    return (
    <div className="adm-container">
        <h1>Minhas tarefas</h1>

        <form className="form" onSubmit={handleRegister}>
            <textarea 
                placeholder="Digita a sua tarefa..."
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
            />
            <button className="btn-register" type="submit">Registrar tarefa</button>
        </form>

        <article className="list">
            <p>Estudar hj a noite</p>
            <div>
                <button>Editar</button>
                <button className="btn-delete">Concluir</button>
            </div>
        </article>

        <button className="btn-logout" onClick={handleLogout}>Sair</button>

    </div>
  )
}

export default Admin