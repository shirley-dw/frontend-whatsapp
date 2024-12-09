import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ObtenerMensajesById } from "../../Fetching/mensajesFetching";
import Mensajes from '../Mensaje/Mensajes';

import './ListaMensajes.css';

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const actualizarMensajes = () => {
    fetchMensajes(params.id);

  }

  const loguedUserId = JSON.parse(sessionStorage.getItem('access-token'));

  const fetchMensajes = async (id) => {
    try {
      const msgs = await ObtenerMensajesById(id);

      if (!msgs || !Array.isArray(msgs)) {
        throw new Error("Los mensajes obtenidos son undefined o no son un array");
      }

      setMessages(msgs);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensajes(params.id);

  }, [messages.length]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-msj" id="message-container">
      {messages.length === 0 ? (
        <div className="no-messages">No hay mensajes para mostrar.</div>
      ) : (
        messages.map((message) => (
          <React.Fragment key={`${message._id}`}>

            <Mensajes mensaje={message} isRecievedMessage={loguedUserId.userId !== message.destinatario._id}
              actualizarMensajes={actualizarMensajes} />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default ListaMensajes;
