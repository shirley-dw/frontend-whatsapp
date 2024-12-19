import { useParams, Link, useLocation } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { IoInformationCircle } from "react-icons/io5";
import './ChatHeaderInfo.css';
import { ObtenerContactosById } from "../../Fetching/contactosFetching";
import { useEffect, useState } from "react";

const ChatHeaderInfo = () => {
  const { id } = useParams();
  const { state } = useLocation();  // Obtener los datos pasados en el state
  const [contacto, setContacto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ruta de la imagen por defecto
  const defaultImage = '/imagenes/user.png';

  // Verificar si los datos vienen de state o por la API
  const imagenes = state && state.thumbnail && state.thumbnail.startsWith("http")
    ? state.thumbnail
    : (state && state.thumbnail ? `/imagenes/${state.thumbnail}` : defaultImage);

  // Obtener datos de contacto desde la API si no vienen desde state
  useEffect(() => {
    if (!state) {  // Si no hay state, realizar la petición para obtener datos de contacto
      ObtenerContactosById(id).then((contacto) => {
        setContacto(contacto);
        setLoading(false);
      }).catch((error) => {
        console.error("Error obteniendo los contactos:", error);
        setLoading(false);
      });
    } else {
      setContacto(state); // Si viene desde state, setearlo directamente
      setLoading(false);
    }
  }, [id, state]); // Usamos state como dependencia también para cuando cambie

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="chat-header-info">
      <div className="contact">
        <Link to={"/inicio"}>
          <SlArrowLeft className="arrow-header" />
        </Link>
        {contacto && (
          <>
            <img className="profile-pic" src={imagenes} alt="Foto perfil" />
            <div className="chat-header">
              <div className="profile-name-header">{contacto.name}</div>
              <div className="status-text-header">{contacto.status}</div>
            </div>
          </>
        )}
      </div>
      <div className="icons">
        <IoInformationCircle className="icons" />
      </div>
    </div>
  );
};

export default ChatHeaderInfo;
