import mongoose from 'mongoose';
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { ObtenerContactosById } from '../../Fetching/contactosFetching.js';
import { ObtenerUsuarioById } from '../../Fetching/fetchingUser.js';
import { isValidObjectId } from '../../utils/validate.id.js';
import './MensajeForm.css';

const MensajeForm = ({ setMensajes }) => {
    const [message, setMessage] = useState('');
    const param = useParams();
    const destinatarioId = param.id;

    const sessionItem = sessionStorage.getItem('access-token');
    const itemParse = JSON.parse(sessionItem);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authorId = new mongoose.Types.ObjectId(`${itemParse.userId}`);

        // Validación de los IDs antes de enviar
        if (!isValidObjectId(authorId)) {
            console.error("El ID del autor no es válido.");
            return;
        }

        if (!isValidObjectId(destinatarioId)) {
            console.error("El ID del destinatario no es válido.");
            return;
        }

        const contact = await ObtenerContactosById(destinatarioId);

        const user = await ObtenerUsuarioById(contact.usuario);

        const msjNuevo = {
            author: itemParse.userId,
            text: message,
            status: 'visto',
            day: new Date().toLocaleDateString(),
            hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            destinatario: user._id,
        };

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/api/auth/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${itemParse.token}`,
                },
                body: JSON.stringify(msjNuevo),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el mensaje');
            }

            const savedMessage = await response.json();

            setMensajes(prevMensajes => [...prevMensajes, savedMessage]);
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
