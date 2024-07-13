import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function EditarEmpleado() {

    const urlBase = "http://localhost:8080/rh-app/empleados";

    let navegacion = useNavigate();

    const {id} = useParams();

    const [empleado, setEmpleado] = useState({
        nombre: "",
        departamento: "",
        sueldo: ""
    });

    const { nombre, departamento, sueldo } = empleado;

    useEffect(()=>{
        cargarEmpleado();
    },[]); //[] solo una peticion y consulta no infinita

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setEmpleado(resultado.data);
    }

    const onInputChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Corrección del error tipográfico
        await axios.put(`${urlBase}/${id}`, empleado);
        navegacion('/');
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "3rem" }}>
                <h2>Editar Empleado</h2>
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
                    <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
                    <Link to='/' className='btn btn-danger btn-sm'>Regresar</Link>
                </div>
            </form>
        </div>
    );
}
