import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// Importo componentes
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from '../index.js';
// Importo estilos
import './ChatScreen.css';

const ChatScreen = () => {
    const { id } = useParams();
    const location = useLocation();
    const [mensajes, setMensajes] = useState([]);

    console.log('Contact ID:', id);
    console.log('Location state:', location.state);

    return (
        <div className='chat'>
            <ChatHeaderInfo contact_id={id} />
            <div className='chat-screen'>
                <ListaMensajes contact_id={id} />
            </div>
            <MensajeForm mensajes={mensajes} setMensajes={setMensajes} contact_id={id} />
        </div>
    );
};

export default ChatScreen;
