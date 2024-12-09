import React from 'react';
import { AiOutlineInfoCircle, AiOutlineFile, AiOutlineLock, AiOutlineTeam } from "react-icons/ai";
import { RiGalleryLine } from "react-icons/ri";
import { MdLink, MdEvent } from "react-icons/md";
import './NavBarInfoScreen.css';

const NavBarInfoScreen = () => {
    const menuItems = [
        {
            id: 1, icon: <AiOutlineInfoCircle className='navbar-icons' />, text: "Resumen"
        },
        { id: 2, icon: <RiGalleryLine className='navbar-icons' />, text: "Multimedia" },
        { id: 3, icon: <AiOutlineFile className='navbar-icons' />, text: "Archivos" },
        { id: 4, icon: <MdLink className='navbar-icons' />, text: "Enlaces" },
        { id: 5, icon: <MdEvent className='navbar-icons' />, text: "Eventos" },
        { id: 6, icon: <AiOutlineLock className='navbar-icons' />, text: "Cifrado" },
        { id: 7, icon: <AiOutlineTeam className='navbar-icons' />, text: "Grupos" },
    ];

    return (
        <nav className="nav-info-container">
            <ul className='nav-info-content'>
                {menuItems.map(item => (
                    <li key={item.id} className="menu-item-info">
                        {item.icon}
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBarInfoScreen;
