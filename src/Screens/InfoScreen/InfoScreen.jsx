import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
/* import { IoChevronBackSharp } from "react-icons/io5";
 */import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineVideocam, MdOutlinePhone } from "react-icons/md";
import NavBarInfoScreen from '../../Components/NavBarInfoScreen/NavBarInfoScreen';
import { ObtenerContactosById } from '../../Fetching/contactosFetching';
import './InfoScreen.css';

const InfoScreen = () => {
  const { id } = useParams();
  /*   const navigate = useNavigate(); */
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacto = async () => {
      try {
        const contactosFetch = await ObtenerContactosById(id);
        const contacto = contactosFetch.find(c => c.id === id);
        setContacto(contacto);
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacto();
  }, [id]);

  /*  const goBack = () => {
     navigate(-1);
   }; */

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
                {/* <IoChevronBackSharp className='back-icon' onClick={goBack} /> */}
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
