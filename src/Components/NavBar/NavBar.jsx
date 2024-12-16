import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSignOutAlt, FaCog } from 'react-icons/fa';
import { BsFillChatLeftTextFill, BsTelephone } from "react-icons/bs";
import { RiChatSmile3Line } from "react-icons/ri";
import { LiaToolsSolid } from "react-icons/lia";
import { ObtenerInformacionUser } from '../../Fetching/userFetching.js';
import './NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejar los errores
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true); // Activar estado de carga

                // Obtener el token de sessionStorage
                const token = sessionStorage.getItem('access-token');
                if (!token) {
                    throw new Error('Token no encontrado. El usuario no está autenticado.');
                }

                // Decodificar el token para extraer el user_id
                const { user_id } = JSON.parse(atob(token.split('.')[1])); // Decodificar payload del JWT
                console.log("user_id obtenido del token:", user_id);

                if (!user_id) {
                    throw new Error('ID de usuario no encontrado en el token');
                }

                // Realizar la solicitud a la API
                const userInfo = await ObtenerInformacionUser(user_id);
                setUser(userInfo);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error.message);
                setError('Error al cargar la información del usuario');
            } finally {
                setLoading(false); // Desactivar estado de carga
            }
        };

        fetchUser();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        try {
            sessionStorage.removeItem('access-token');
            navigate('/login'); // Redirige al login después de cerrar sesión
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="nav-bar">
            {loading && <div>Cargando...</div>}
            {error && <div>{error}</div>}
            <img src="./imagenes/logo.png" alt="" />
            {user && !loading && (
                <>
                    <div className="user-menu" style={{ display: isOpen ? 'block' : 'none' }}>
                        <div className="user-info">
                            <img src="./imagenes/profile.png" alt="Perfil" className="profile-picture"
                                onClick={toggleMenu}
                            />
                            <h3 className="user-name">{user.name}</h3>
                            <p className="user-email">{user.email}</p>
                        </div>
                        <div className="menu-options">
                            <div className="menu-option">
                                <FaCog className="menu-icon" /> Configuración
                            </div>
                            <div className="menu-option" onClick={handleLogout}>
                                <FaSignOutAlt className="menu-icon" /> Cerrar sesión
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="nav-icons">
                <div className="access-nav-icons"><BsFillChatLeftTextFill className='icons-nav-bar' /></div>
                <div className="access-nav-icons"><BsTelephone className='icons-nav-bar' /></div>
                <div className="access-nav-icons"><RiChatSmile3Line className='icons-nav-bar' /></div>
                <div className="access-nav-icons"><LiaToolsSolid className='icons-nav-bar' /></div>
            </div>
        </div>
    );
};

export default NavBar;
