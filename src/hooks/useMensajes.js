import { useState, useEffect } from 'react';
import { ObtenerMensajes } from '../Fetching/mensajesFetching';

const useMensajes = () => {
    const [messages, setMessages] = useState([]);
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const messages = await ObtenerMensajes();
                setMessages(messages);
            } catch (error) {
                console.error('Error al obtener los mensajes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMensajes();
    }, []);

    return { messages, setMessages, contacto, setContacto, loading };
};

export default useMensajes;