import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversation } from "../../Fetching/mensajesFetching.js";
import Mensajes from '../Mensaje/Mensajes';
import './ListaMensajes.css';

const ListaMensajes = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { receiver_id } = useParams(); // Obtener receiver_id desde useParams

  const fetchMensajes = async () => {
    try {
      const msgs = await getConversation(receiver_id);

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
    if (receiver_id) {
      fetchMensajes();
    }
  }, [receiver_id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-msj" id="message-container">
      {messages.length === 0 ? (
        <div className="no-messages">No hay mensajes para mostrar.</div>
      ) : (
        messages.filter(message => message !== undefined).map((message) => (
          <React.Fragment key={message._id}>
            <Mensajes mensaje={message} isRecievedMessage={loguedUserId !== message.receiver} actualizarMensajes={fetchMensajes} />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default ListaMensajes;
