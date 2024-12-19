import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from "../index.js";
import "./ChatScreen.css";

const ChatScreen = () => {
    const { contact_id } = useParams();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldRefreshMessages, setShouldRefreshMessages] = useState(false); // Estado compartido

    useEffect(() => {
        // Extraer user_id del token
        const extractUserIdFromToken = () => {
            try {
                const token = sessionStorage.getItem("access-token");
                if (!token) throw new Error("Token no encontrado");

                const decodedPayload = JSON.parse(atob(token.split(".")[1]));
                const { user_id } = decodedPayload;

                if (!user_id) throw new Error("user_id no encontrado en el token");

                setUserId(user_id);
            } catch (error) {
                console.error("Error al obtener user_id:", error.message);
            } finally {
                setLoading(false);
            }
        };

        extractUserIdFromToken();
    }, []);

    // Manejo del estado de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="chat">
            <ChatHeaderInfo contact_id={contact_id} />
            <div className="chat-screen">
                {/* Pasar el estado de refresh a ListaMensajes */}
                <ListaMensajes
                    user_id={userId}
                    receiver_id={contact_id}
                    shouldRefresh={shouldRefreshMessages}
                    onRefreshComplete={() => setShouldRefreshMessages(false)} // Resetear el flag después de refrescar
                />
            </div>
            <MensajeForm
                user_id={userId}
                receiver_id={contact_id}
                onMessageSent={() => setShouldRefreshMessages(true)} // Activar el refresh al enviar un mensaje
            />
        </div>
    );
};

export default ChatScreen;
