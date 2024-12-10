import React, { useEffect, useState } from 'react';
import ContactoCard from '../Contacto/ContactoCard.jsx';
import { ObtenerContactosByUserId } from '../../../Fetching/contactosFetching';
import './ListaContactos.css';

const ListaContactos = ({ search }) => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContactos();
    }, [search]);

    const fetchContactos = async () => {
        try {
            const sessionItem = sessionStorage.getItem('access-token');
            console.log('Valor de sessionItem:', sessionItem);

            if (!sessionItem) {
                throw new Error('No se encontró el token de acceso en sessionStorage');
            }

            const parsedItem = JSON.parse(sessionItem);
            console.log('Valor de parsedItem:', parsedItem);

            if (!parsedItem.userId) {
                throw new Error('El token de acceso no contiene un ID de usuario válido');
            }

            const userId = parsedItem.userId;
            console.log('ID del usuario:', userId);

            const contactosFetch = await ObtenerContactosByUserId(userId);
            console.log('Contactos obtenidos:', contactosFetch);

            setContactos(contactosFetch);
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <div>Cargando...</div>}
            {contactos && contactos.map(contacto => (
                <ContactoCard
                    key={contacto._id}
                    id={contacto._id}
                    name={contacto.name}
                    thumbnail={contacto.thumbnail}
                    status={contacto.status}
                    text={contacto.text}
                    hour={contacto.hour}
                />
            ))}
        </div>
    );
};

export default ListaContactos;
