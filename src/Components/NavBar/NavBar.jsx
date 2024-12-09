import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { BsFillChatLeftTextFill, BsTelephone } from "react-icons/bs";
import { RiChatSmile3Line } from "react-icons/ri";
import { LiaToolsSolid } from "react-icons/lia";
import { ObtenerUsuarioById, logoutUser } from '../../Fetching/fetchingUser.js';
import './NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionItem = sessionStorage.getItem('access-token');
                const parsedItem = JSON.parse(sessionItem);
                const userId = parsedItem.userId;
                const userInfo = await ObtenerUsuarioById(userId);
                setUser(userInfo);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        fetchUser();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await logoutUser(user._id); // Llama a la función de cierre de sesión
            sessionStorage.removeItem('access-token');
            navigate('/login'); // Redirige al login después de cerrar sesión
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="nav-bar">
            {user && (
                <>
                    <img
                        src={user.profilePicture || './imagenes/profile.jpg'}
                        alt={`${user.name} profile`}
                        className="profile-picture"
                        onClick={toggleMenu}
                    />
                    <div className={`user-menu ${isOpen ? 'open' : ''}`}>
                        <div className="user-info">
                            <img
                                src={user.profilePicture || './imagenes/profile.jpg'}
                                alt={`${user.name} profile`}
                                className="profile-picture-large"
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
