import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutUser, GetInformationUser } from '../../Fetching/userFetching';
import { RiLogoutCircleLine } from "react-icons/ri";
import './InfoUser.css';


const InfoUser = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const sessionItem = sessionStorage.getItem('access-token');
                if (!sessionItem) {
                    throw new Error('No se encontró el token de acceso en sessionStorage');
                }

                const userId = sessionStorage.getItem('user-id');
                if (!userId) {
                    throw new Error('El user_id no está disponible en sessionStorage');
                }

                const user = await GetInformationUser(userId);
                setUserInfo(user);
            } catch (error) {
                console.error("Error al obtener la información del usuario.", error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogOut = async () => {
        try {
            const success = await LogOutUser();
            if (success) {
                navigate('/');
            }
        } catch (error) {
            console.error("No se pudo cerrar sesión.", error);
        }
    };

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <div className="info-user-container">
            <div className="profile-container">
                <img
                    src={userInfo?.profileImage || "./imagenes/profile.jpg"}
                    alt="Imagen de perfil"
                    className="info-user-profile"
                    onClick={handleToggleMenu}
                />
                {toggleMenu && (
                    <div className="toggle-menu">
                        <div className="user-info">
                            <img
                                src={userInfo?.profileImage || "./imagenes/profile.jpg"}
                                alt="Imagen de perfil"
                                className="menu-user-profile"
                            />
                            <p className="user-name">{userInfo?.name || "Nombre del usuario"}</p>
                            <p className="user-email">{userInfo?.email || "email@ejemplo.com"}</p>
                        </div>
                        <button onClick={handleLogOut} className="logout-button">
                            <RiLogoutCircleLine className='logout-icon' /> Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoUser;
