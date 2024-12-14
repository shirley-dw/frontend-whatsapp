import React, { useEffect, useState } from 'react';
import ContactoCard from '../Contacto/ContactoCard.jsx';
import { getUserContacts } from '../../../Fetching/contactosFetching';
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

            // El token JWT es una cadena, no necesitas parsearlo
            const token = sessionItem;
            console.log('Token JWT:', token);

            // Obtener contactos utilizando el token directamente
            const contactosFetch = await getUserContacts();
            console.log('Contactos obtenidos:', contactosFetch);

            // Validar que la respuesta es un array
            if (Array.isArray(contactosFetch)) {
                setContactos(contactosFetch);
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
