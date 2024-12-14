import React, { useEffect, useState } from 'react';
import ContactoCard from '../Contacto/ContactoCard.jsx';
import { ObtenerContactos } from '../../../Fetching/contactosFetching';
import './ListaContactos.css';

const ListaContactos = ({ search }) => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            let parsedItem;
            try {
                parsedItem = JSON.parse(sessionItem);
            } catch (error) {
                throw new Error('Error al parsear el token de acceso');
            }

            console.log('Valor de parsedItem:', parsedItem);

            if (!parsedItem.userId) {
                throw new Error('El token de acceso no contiene un ID de usuario válido');
            }

            const userId = parsedItem.userId;
            console.log('ID del usuario:', userId);

            // Obtener contactos por ID de usuario
            const contactosFetch = await ObtenerContactos(userId);
            console.log('Contactos obtenidos:', contactosFetch);

            // Verificar si la respuesta contiene la propiedad 'contacts' y es un array
            if (contactosFetch && Array.isArray(contactosFetch.contacts)) {
                setContactos(contactosFetch.contacts);
            } else {
                throw new Error('La respuesta no contiene contactos válidos');
            }
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
            setError('Hubo un error al cargar los contactos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <div>Cargando...</div>}
            {error && <div>{error}</div>}
            {!loading && contactos.length === 0 && <div>No hay contactos disponibles</div>}
            {!loading && contactos && contactos.map(contacto => (
                <ContactoCard
                    key={contacto._id}
                    contact_id={contacto._id}
                    name={contacto.name}
                    email={contacto.email}
                    phone={contacto.phone}
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
