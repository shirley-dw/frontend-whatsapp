import React, { useEffect, useState } from "react";
import { GetConversation } from "../../Fetching/mensajesFetching.js";
import Mensajes from "../Mensaje/Mensajes";
import "./ListaMensajes.css";

const ListaMensajes = ({ user_id, receiver_id, shouldRefresh, onRefreshComplete }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMensajes = async () => {
    if (!user_id || !receiver_id) {
      console.error("Faltan user_id o receiver_id");
      return;
    }
    try {
      const msgs = await GetConversation(user_id, receiver_id);
      if (!msgs || !Array.isArray(msgs)) {
        throw new Error("Los mensajes obtenidos no son un arreglo válido");
      }
      setMessages(msgs);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    } finally {
      setLoading(false);
      if (onRefreshComplete) onRefreshComplete();
    }
  };

  // Carga inicial de mensajes
  useEffect(() => {
    fetchMensajes();
  }, [user_id, receiver_id]);

  // Polling: consultar mensajes cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user_id && receiver_id) {
        fetchMensajes();
      }
    }, 5000);

    // Limpieza: eliminar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [user_id, receiver_id]);


  useEffect(() => {
    if (shouldRefresh) {
      fetchMensajes();
    }
  }, [shouldRefresh]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (messages.length === 0) {
    return <div>No hay mensajes para mostrar.</div>;
  }

  return (
    <div className="container-msj" id="message-container">
      {messages.map((message) => (
        <React.Fragment key={message._id}>
          <Mensajes
            mensaje={message}
            isRecievedMessage={user_id !== message.receiver}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListaMensajes;
