import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteContact } from "../../../Fetching/contactosFetching.js";
import "./Contacto.css";

const ContactoCard = ({
    contact_id,
    name,
    email,
    phone,
    thumbnail,
    activo,
    content,
    hour,
    onSelect,
    onDelete,
}) => {
    const defaultImage = "/imagenes/user.png"; // Imagen por defecto
    const imagenes =
        thumbnail && thumbnail.startsWith("http")
            ? thumbnail
            : thumbnail
                ? `/imagenes/${thumbnail}`
                : defaultImage;
    const navigate = useNavigate();

    const handleDeleteContact = async (e) => {
        e.stopPropagation();
        try {
            await DeleteContact(contact_id);
            console.log("Contacto eliminado correctamente");
            if (onDelete) onDelete(contact_id);
        } catch (error) {
            console.error("Error al eliminar el contacto:", error.message);
        }
    };

    // Maneja la selección del contacto
    const handleSelectContacto = () => {
        if (onSelect) {
            onSelect(contact_id);
        } else {
            navigate(`/mensaje/${contact_id}`, {
                state: { contact_id, name, email, phone, thumbnail, activo, content, hour },
            });
        }
    };

    return (
        <div className="contacto" onClick={handleSelectContacto}>
            <div key={contact_id} className="contact-item">
                <img src={imagenes} alt={name} className="img-profile" />
                <div className="dato-card">
                    <p className="name-card">{name}</p>
                </div>
            </div>
            <div className="options-container-contacto">
                <FaTrash
                    className="delete-icon"
                    onClick={handleDeleteContact}
                />
            </div>
        </div>
    );
};

export default ContactoCard;
