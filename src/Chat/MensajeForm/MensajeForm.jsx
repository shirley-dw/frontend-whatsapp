import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useParams } from 'react-router-dom';
import './MensajeForm.css';

const MensajeForm = ({ setMessages }) => {
    const [message, setMessage] = useState('');
    const param = useParams();
    const receiver_id = param.id;

    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
        throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    // Elimina JSON.parse porque el token es una cadena
    const parsedItem = { token: sessionItem }; // Asume que el token es la cadena almacenada
    if (!parsedItem.token) {
        throw new Error('Token de acceso inválido');
    }
    console.log(sessionStorage.getItem("access-token"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto con los datos del mensaje
        const msjNuevo = {
            author: parsedItem.user_id, // Asegúrate de que 'user_id' esté disponible en parsedItem si lo necesitas
            receiver_id: receiver_id,
            content: message,
            status: 'visto',
            day: new Date().toLocaleDateString(),
            hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/api/messages/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedItem.token}`,
                },
                body: JSON.stringify(msjNuevo),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar el mensaje');
            }

            const savedMessage = await response.json();

            setMessages(prevMessages => [...prevMessages, savedMessage.data.message]);
            setMessage(''); // Resetea el input
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="message-form-chat" id="message-form">
            <BsEmojiSmile className='icons-emoji' />
            <input
                className='input-mensaje'
                type='text'
                name='nuevomensaje'
                placeholder='Escribe un mensaje'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required={true}
            />
            <IoCameraOutline className='icons-input' />
            <MdAttachFile className='icons-input' />
            <button type="submit" className='btn-send'><MdSend /></button>
        </form>
    );
};

export default MensajeForm;
