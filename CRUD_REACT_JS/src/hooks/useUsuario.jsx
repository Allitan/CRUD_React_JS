import { useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Swal from "sweetalert2";

const useUsuario = () => {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState('');
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
        setRole('')

        if (operation === 1){
            setTitleModal('Añadir Usuario')
        } else if (operation === 2) {
            setTitleModal('Editar Usuario')
            setId(usuer.id)
            setName(usuer.name)
            setEmail(usuer.email)
            setPassword(usuer.password)
            setRole(usuer.role)
        }

        setOperation(operation)

    } 

    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await axios(obj).then((response) => {
            let mensaje = ''
            if (metodo === 'POST') {
                mensaje = 'Usuario añadido correctamente'
            } else if (metodo === 'PUT') {
                mensaje = 'Usuario editado correctamente'
            } else if (metodo === 'DELETE') {
                mensaje = 'Usuario eliminado correctamente'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getUsers()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    const guardarEditarUsuario = () => {
        let payload, metodo, urlAxios

        if (name === ''){
            alertaWarning('Nombre del usuario es requerido', 'name')
        } else if (email === ''){
            alertaWarning('Email del usuario es requerido', 'email')
        } else if (password === ''){
            alertaWarning('Contraseña del usuario es requerido', 'password')
        } else if (role=== ''){
            alertaWarning('Role del usuario es requerido', 'role')
        } else {
            payload = {
                name : name,
                email : email,
                password : password,
                role: role,
                avatar: 'https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg'
            }

            if (operation === 1) {
                metodo = 'POST'
                urlAxios = url
            } else if (operation === 2) {
                metodo = 'PUT'
                urlAxios = `${url}/${id}`
            }

            enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    const eliminarUsuario = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el usuario?',
            icon: 'question',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    return {
        users,
        setUsers,
        getUsers,
        openModal,
        id,
        setId,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        titleModal,
        guardarEditarUsuario,
        eliminarUsuario,
       
    }

}

export default useUsuario;