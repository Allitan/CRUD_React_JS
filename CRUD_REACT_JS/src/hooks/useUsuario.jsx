import { use, useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Swal from "sweetalert2";

const useUsuario = () => {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const url = 'https://api.escuelajs.co/api/v1/users'

    const getUsers = async () => {
        const response = await axios.get(url)
        setUsers(response.data)
    }

    const openModal = (operation, usuer) => {
        setId('')
        setName('')
        setEmail('')
        setPassword('')
        setRol('')

        if (operation === 1){
            setTitleModal('Añadir Usuario')
        } else if (operation === 2) {
            setTitleModal('Editar Usuario')
            setId(usuer.id)
            setName(usuer.name)
            setEmail(usuer.email)
            setPassword(usuer.password)
            setRol(usuer.role)
        }

        setOperation(operation)

    } 

    const guardarEditarUsuario = () => {
        let payload, metodo, urlAxios

        if (name === ''){
            alertaWarning('Nombre del usuario es requerido', 'name')
        } else if (email === ''){
            alertaWarning('Email del usuario es requerido', 'email')
        } else if (password === ''){
            alertaWarning('Contraseña del usuario es requerido', 'password')
        } else if (rol=== ''){
            alertaWarning('Role del usuario es requerido', 'rol')
        } else {
            payload = {
                name : name,
                email : email,
                password : password,
                role: rol,
                avatar: ['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            }

            if (operation === 1) {
                metodo = 'POST'
                urlAxios = url
            } else if (operation === 2) {
                metodo = 'PUT'
                urlAxios = `${url}/${id}`
            }

            //enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    return {
        users,
        setUsers,
        getUsers,
       
    }

}

export default useUsuario;