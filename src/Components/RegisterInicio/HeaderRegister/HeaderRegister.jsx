import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

import './HeaderRegister.css';

const HeaderRegister = () => {
  return (
    <header className='header-register'>
      <div className='header-container-register'>
        <FaWhatsapp className='logo-register' />
        <h1 className='header-title'>WhatsApp</h1>
      </div>

    </header>
  )
}

export default HeaderRegister
