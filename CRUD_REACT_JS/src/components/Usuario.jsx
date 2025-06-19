import Campo from "./Campo"
import { useEffect } from "react"
import useUsuario from "../hooks/useUsuario"

const Usuarios = () => {
    const { 
        users, 
        setUsers,
        getUsers 
    } = useUsuario()

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProveedor"><i className="fa-solid fa-circle-plus" /> Añadir</button>
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
                                <th>Rol</th>
                                
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
                                </tr>
                             ))
                           }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modalProveedor" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5"> abc </label>
                        </div>
                        <div className="modal-body">
                            <Campo idCampo="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre"  />
                            <Campo idCampo="correo" iconName="fa-solid fa-envelope" inputType="email" placeHolder="Correo Electrónico" />
                            <Campo idCampo="contrasenia" iconName="fa-solid fa-user-tag" inputType="text" placeHolder="Contraseña" />
                            <Campo idCampo="rol" iconName="fa-solid fa-user" inputType="text" placeHolder="Rol" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" ><i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Usuarios;