// Importaciones de react 
import { useState, useEffect } from 'react';

// Función fetching 
import { ObtenerContactos } from '../Fetching/contactosFetching';


const useContactos = (id) => {
   //Defino estados
    const [contacto, setContacto] = useState(null);
    const [loading, setLoading] = useState(true);
   
 // la consulta
    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const contactos = await ObtenerContactos();
                const dataContacto = contactos.find(contacto => contacto.id === Number(id));
                setContacto(dataContacto);
            } catch (error) {
                console.error("Error al obtener contactos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactos();
    }, [id]);

  // RETORNA LA CONSULTA
    return { contacto, loading};
};


export default useContactos;
