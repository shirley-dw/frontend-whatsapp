// Importo librerias
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegBell, FaRegBookmark } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import { PiLockLaminatedFill } from "react-icons/pi";
import { MdOutlinePhone, MdOutlineVideocam, MdSearch, MdLock, MdOutlineTimelapse } from "react-icons/md";
// Importo Fetching
import { ObtenerContactos } from '../../../Fetching/contactosFetching'
// Importo estilos
import './ContactInfo.css'

const ContactInfo = () => {
    const { id } = useParams([]);
    const [contacto, setContacto] = useState([]);
    // Fetching
    useEffect(() => {
        ObtenerContactos()
            .then(data => {
                const contactoEncontrado = data.find(contacto => contacto.id === Number(id));
                if (contactoEncontrado) {
                    setContacto(contactoEncontrado);
                }
            })
            .catch(error => {
                console.error('Error al obtener contactos:', error);
            });
    }, [id]);
    // Imagenes
    const imagenes = '/imagenes/' + contacto.thumbnail;

    // Render
    return (
        <div className="infoContainer">
            <div className="infoHeader">
                <Link to="/">
                    <FaArrowLeft className="arrow" />
                </Link>
                <div className="bioInfo">
                    <img src={imagenes} alt={contacto.nombre} />
                    <div className="contact-info">
                        <div className="contact-name">{contacto.nombre}</div>
                    </div>

                </div>
                <ThreeDotsVertical className="icons" />
            </div>
            <div className="opciones">
                <div className="icon-container"><MdOutlinePhone className="icons" /><p>Llamar</p></div>
                <div className="icon-container"><MdOutlineVideocam className="icons" /><p>Video</p></div>
                <div className="icon-container"><MdSearch className="icons" /><p>Buscar</p></div>
            </div>
            <div className="decorado">
                <div className="avanced"><FaRegBell className="icons" /><p>Notificaciones</p></div>
                <div className="avanced"><AiOutlinePicture className="icons" /><p>Visibilidad de archivos multimedia<span className="sub">Desactivada</span></p></div>
                <div className="avanced"><FaRegBookmark className="icons" /><p>Mensajes conservados</p></div>
                <div className="avanced"><MdLock className="icons" /><p>Cifrado<span>Los mensajes y las llamadas están cifrados de extremo a extremo. Toca para verificarlo</span></p></div>
                <div className="avanced"><MdOutlineTimelapse className="icons" /><p>Mensajes temporales <span>90 dias</span></p></div>
                <div className="avanced"><PiLockLaminatedFill className="icons" /><p>Restringir chat<span>Restringe y oculta este chat en este dispositivo</span></p> </div>
            </div>
        </div>
    );
}



export default ContactInfo;