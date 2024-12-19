import React from 'react';
import { BsFillChatLeftTextFill, BsTelephone } from "react-icons/bs";
import { RiChatSmile3Line } from "react-icons/ri";
import { LiaToolsSolid } from "react-icons/lia";
import './NavBar.css';
import InfoUser from '../InfoUser/InfoUser';
const NavBar = () => {

    return (
        <div className="nav-bar">
            <InfoUser />
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
