import React, { useState } from 'react';
// Importo componentes
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from '../index.js';
// Importo estilos
import './ChatScreen.css';

const ChatScreen = () => {
    const [mensajes, setMensajes] = useState([]);
    return (
        <div className='chat'>
            <ChatHeaderInfo />
            <div className='chat-screen'>
                <ListaMensajes />
            </div>
            <MensajeForm mensajes={mensajes} setMensajes={setMensajes} />
        </div>
    );
};

export default ChatScreen;
