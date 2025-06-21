import Campo from "./Campo"
import { useEffect } from "react"
import useUsuario from "../hooks/useUsuario"
import { alertaWarning } from "../alertas"

const Usuarios = () => {
    const { 
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
    } = useUsuario()

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUsuario" onClick={() => openModal(1)}><i className="fa-solid fa-circle-plus" /> Añadir</button>
                    </div>    
                </div>
            </div>

            <div className="col-12 col-lg-8 offset-lg-2 mt-3">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Contraseña</th>
                                <th>Role</th>
                                <th>Accion</th>
                                
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                           {
                             users.map((user, i) => (
                                <tr key={user.id}>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUsuario" onClick={() => openModal(2, user)}><i className="fa-solid fa-pen-to-square" /></button>
                                        <button className="btn btn-danger" onClick={() => eliminarUsuario(user.id)}><i className="fa-solid fa-trash-can" /></button>
                                    </td>
                                </tr>
                             ))
                           }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modalUsuario" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5"> {titleModal} </label>
                        </div>
                        <div className="modal-body">
                            <Campo idCampo="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                            <Campo idCampo="correo" iconName="fa-solid fa-envelope" inputType="email" placeHolder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Campo idCampo="contrasenia" iconName="fa-solid fa-user-tag" inputType="text" placeHolder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Campo idCampo="role" iconName="fa-solid fa-user" inputType="text" placeHolder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => guardarEditarUsuario()} ><i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Usuarios;