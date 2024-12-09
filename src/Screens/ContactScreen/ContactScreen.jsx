import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ListaContactos from "../../Components/Contactos/ListaContactos/ListaContactos.jsx";
import ContactoHeader from "../../Components/Contactos/ContactoHeader/ContactoHeader.jsx";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import './ContactScreen.css';
import { ObtenerContactos } from "../../Fetching/contactosFetching.js";

const ContactScreen = () => {
    const [search, setSearch] = useState('');
    const [contactos, setContactos] = useState([]);
    const navigate = useNavigate();

    const fetchContactos = async () => {
        try {
            const fetchedContactos = await ObtenerContactos();
            setContactos(fetchedContactos);
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
        }
    };

    useEffect(() => {
        fetchContactos();
    }, []);

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleContactUpdated = () => {
        fetchContactos(); // Actualizar la lista de contactos
    };

    return (
        <div className="contact-screens">
            <ContactoHeader search={search} onSearchChange={handleSearchChange} onContactUpdated={handleContactUpdated} />
            <div className="separador">
                <ListaContactos search={search} contactos={contactos} />
            </div>
            <NavBar />
        </div>
    );
};

export default ContactScreen;
