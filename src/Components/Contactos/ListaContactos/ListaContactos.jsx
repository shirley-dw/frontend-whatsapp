import React, { useEffect, useState } from "react";
import ContactoCard from "../Contacto/ContactoCard.jsx";
import { getUserContacts } from "../../../Fetching/contactosFetching";
import "./ListaContactos.css";

const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContactos();
    }, []);

    const fetchContactos = async () => {
        try {
            const contactosFetch = await getUserContacts();
            if (Array.isArray(contactosFetch)) {
                setContactos(contactosFetch);
            } else {
                throw new Error("La respuesta no contiene contactos válidos");
            }
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
            setError("Hubo un error al cargar los contactos.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (contact_id) => {
        setContactos((prevContactos) =>
            prevContactos.filter((contacto) => contacto._id !== contact_id)
        );
    };

    return (
        <div>
            {loading && <div>Cargando...</div>}
            {error && <div>{error}</div>}
            {!loading && contactos.length === 0 && <div>No hay contactos disponibles</div>}
            {!loading &&
                contactos &&
                contactos.map((contacto) => (
                    <ContactoCard
                        key={contacto._id}
                        contact_id={contacto._id}
                        name={contacto.name}
                        email={contacto.email}
                        phone={contacto.phone}
                        thumbnail={contacto.thumbnail}
                        status={contacto.status}
                        content={contacto.text}
                        hour={contacto.hour}
                        onDelete={handleDelete} 
                    />
                ))}
        </div>
    );
};

export default ListaContactos;
