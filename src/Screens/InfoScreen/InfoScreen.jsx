import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineVideocam, MdOutlinePhone } from "react-icons/md";
import NavBarInfoScreen from '../../Components/NavBarInfoScreen/NavBarInfoScreen';
import { ObtenerContactosById } from '../../Fetching/contactosFetching';
import './InfoScreen.css';

const InfoScreen = () => {
  const { id } = useParams();
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacto = async () => {
      console.log(`Cargando contacto con ID: ${id}`); // Log del ID del contacto que estamos cargando
      try {
        const contactosFetch = await ObtenerContactosById(id);
        console.log('Contactos obtenidos:', contactosFetch); // Log de los contactos obtenidos
        const contacto = contactosFetch.find(c => c.id === id);
        console.log('Contacto encontrado:', contacto); // Log del contacto encontrado
        setContacto(contacto);
      } catch (error) {
        console.error('Error al obtener el contacto:', error); // Log de error
      } finally {
        setLoading(false);
      }
    };

    fetchContacto();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="info-screen">
      <div className='info-screen-content'>
        <NavBarInfoScreen />
      </div>
      {contacto && (
        <>
          <div className="info-content-div">
            <div className='info-del-contact'>
              <div className='contacto-info'>
                <img className="profile-info" src={'/imagenes/profile.jpg'} alt="Foto perfil" />
                <h2>{contacto.name}</h2>
                <p>{contacto.email}</p>
                <div className="options-infoscreen">
                  <button className="icon-container-info">
                    <MdOutlineVideocam className="opciones-icons-info" /> <p>Video</p>
                  </button>
                  <button className="icon-container-info">
                    <MdOutlinePhone className="opciones-icons-info" /> <p>Audio</p>
                  </button>
                </div>
              </div>
            </div>
            <div className='contacto-detalles'>
              <div className='detalle'>
                <span>Estado:</span> <p>{contacto.status}</p>
              </div>
              <div className='detalle'>
                <span>Número:</span> <p>{contacto.phone}</p>
              </div>
              <div className='detalle'>
                <span>Mensajes temporales</span> <p>Desactivados</p>
              </div>
              <div className='notification-slip'>
                <span className='notification-subtitle'>Silenciar notificaciones</span>
                <button className='button-info-screen'><IoMdNotificationsOutline className='icons-info-screen' /><p>Silenciar</p></button>
              </div>
              <div className='buttons-bloqued'>
                <button className='options-bloqued'>Bloquear</button>
                <button className='options-bloqued'>Reportar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoScreen;

