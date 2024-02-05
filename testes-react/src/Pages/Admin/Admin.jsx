import "./admin.css"
import { useState, useEffect } from "react"

import { auth, db } from "../../Firebase"
import { signOut } from "firebase/auth"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore"

const Admin = () => {
  
    const [tarefaInput, setTarefaInput] = useState("")
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})
    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

        if(userDetail) {
            const data = JSON.parse(userDetail);

            const tarefaref = collection(db, "tarefas")
            const q = query(tarefaref, orderBy("created", "desc"), where("userUid", "==", data?.uid))

            const unsub = onSnapshot(q , (snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        userUid: doc.data().userUid
                    })
                })
                console.log(lista);
                setTarefas(lista)
            })
        }
        }
    
        loadTarefas();
      }, [])
    
      async function handleRegister(e)  {
        e.preventDefault();
    
        if(tarefaInput === ''){
          alert("Digite sua tarefa...")
          return;
        }
    
        if(edit?.id) {
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log("TAREFA REGISTRADA")
            setTarefaInput('')
        })
        .catch((error) => {
            console.log("ERRO AO REGISTRAR " + error)
        })    
    
      }
    
      async function handleLogout() {
        await signOut(auth);
      }

      async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef) 
      }
    
      function editTarefa(item) {
        setTarefaInput(item.tarefa)
        setEdit(item)
      }

      async function handleUpdateTarefa(){
        const  docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            alert("Tarefa atualizada")
            setTarefaInput("")
            setEdit({})
        })
        .catch((error) => {
            console.log("erro ao atualizar" + error)
            alert("Erro ao atualizar, tente novamente")
            setTarefaInput("")
            setEdit({})
        })
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
            {Object.keys(edit).length > 0 ? (
                <button className="btn-register" style={{backgroundColor: "#4f087e"}} type="submit">Atualizar tarefa</button>
            ) : (
                <button className="btn-register" type="submit">Registrar tarefa</button>
            )}
        </form>

        {tarefas.map((item) => (
            <article key={item.id} className="list">
            <p>{item.tarefa}</p>
            <div>
                <button onClick={() => editTarefa(item)}>Editar</button>
                <button onClick={() => deleteTarefa(item.id) } className="btn-delete">Concluir</button>
            </div>
        </article>
        ))}

        <button className="btn-logout" onClick={handleLogout}>Sair</button>

    </div>
  )
}

export default Admin