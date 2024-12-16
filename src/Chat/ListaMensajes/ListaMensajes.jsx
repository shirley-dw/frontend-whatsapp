import React, { useEffect, useState } from "react";
import { getConversation } from "../../Fetching/mensajesFetching.js";
import Mensajes from '../Mensaje/Mensajes';
import './ListaMensajes.css';

const ListaMensajes = ({ user_id, receiver_id }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log({ user_id, receiver_id }); // Verifica que los valores de las props se estén pasando correctamente

  const fetchMensajes = async () => {
    if (!user_id || !receiver_id) {
      console.error('Faltan user_id o receiver_id');
      return;  // Salir sin hacer el fetch si los ids no están definidos
    }
    try {
      console.log('Cargando mensajes para:', { user_id, receiver_id });
      const msgs = await getConversation(user_id, receiver_id);

      if (!msgs || !Array.isArray(msgs)) {
        throw new Error("Los mensajes obtenidos no son un arreglo válido");
      }

      setMessages(msgs);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id && receiver_id) {
      fetchMensajes();  // Asegúrate de que se ejecute cuando se pasen correctamente los valores
    }
  }, [user_id, receiver_id]); // Dependencias aseguradas

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (messages.length === 0) {
    return <div>No hay mensajes para mostrar.</div>;
  }


  return (
    <div className="container-msj" id="message-container">
      {messages.length === 0 ? (
        <div className="no-messages">No hay mensajes para mostrar.</div>
      ) : (
        messages.filter(message => message !== undefined).map((message) => (
          <React.Fragment key={message._id}>
            <Mensajes
              mensaje={message}
              isRecievedMessage={user_id !== message.receiver}
              actualizarMensajes={fetchMensajes}
            />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default ListaMensajes;
