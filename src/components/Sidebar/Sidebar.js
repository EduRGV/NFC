// src/components/Sidebar/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-slin_d2a50cf4d3.png';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


const Sidebar = () => {
    const navigate = useNavigate();  

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login'); // Redirige al login
      };

    return (
        <div className="d-flex flex-column p-3 bg-dark text-white" style={{ width: "280px" }}>
            {/* Logo centrado */}
            <div className="d-flex justify-content-center mb-4">
                <NavLink
                    to="/"
                    className="text-decoration-none"
                >
                    <img
                        src={logo}
                        alt="Logo SLIN"
                        style={{
                            width: '100%',
                            maxWidth: '180px',
                            height: 'auto'
                        }}
                    />
                </NavLink>
            </div>

            <hr className="my-2" />

            {/* Menú de navegación */}
            <ul className="nav nav-pills flex-column mb-auto">

                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-person me-2"></i>
                        Formulario
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/listar"
                        className={({ isActive }) =>
                            `nav-link text-white ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-list-ul me-2"></i>
                        Listar
                    </NavLink>
                </li>


                <li className="nav-item">
                    <button
                        className="nav-link text-white"
                        onClick={handleLogout}
                        aria-current="page"  // Mejora de accesibilidad para indicar que este es el enlace activo (si es necesario)
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar sesión
                    </button>
                </li>
            </ul>

            {/* Espacio restante y footer si es necesario */}
            <div className="mt-auto">
                <hr />
                <div className="text-center text-muted small">
                    Versión 1.0.0
                </div>
            </div>
        </div>
    );
};

export default Sidebar;