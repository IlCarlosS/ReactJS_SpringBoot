import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AgregarEmpleado() {
    let navegacion = useNavigate();

    const [empleado, setEmpleado] = useState({
        nombre: "",
        departamento: "",
        sueldo: ""
    });

    const { nombre, departamento, sueldo } = empleado;

    const onInputChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Corrección del error tipográfico
        const urlBase = "http://localhost:8080/rh-app/empleados";
        await axios.post(urlBase, empleado);
        navegacion('/');
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "3rem" }}>
                <h2>Agregar Empleado</h2>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control"
                        id='nombre' name='nombre' required
                        value={nombre} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control"
                        id="departamento" name='departamento'
                        value={departamento} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sueldo" className="form-label">Sueldo</label>
                    <input type="number" step="any" className="form-control"
                        id="sueldo" name='sueldo'
                        value={sueldo} onChange={onInputChange} />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
                    <Link to='/' className='btn btn-danger btn-sm'>Regresar</Link>
                </div>
            </form>
        </div>
    );
}
