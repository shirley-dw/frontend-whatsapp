import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from '../index.js';
import './ChatScreen.css';

const ChatScreen = () => {
    const { contact_id } = useParams();  // Asegúrate de que esto se corresponda con el parámetro en la URL
    const [messages, setMessages] = useState([]);

    console.log('Contact ID:', contact_id);
    console.log('Location state:', location.state); // Verifica qué contiene location.state

    return (
        <div className='chat'>
            <ChatHeaderInfo contact_id={contact_id} />
            <div className='chat-screen'>
                <ListaMensajes receiver_id={contact_id} />
            </div>
            <MensajeForm messages={messages} setMessages={setMessages} contact_id={contact_id} />
        </div>
    );
};

export default ChatScreen;
