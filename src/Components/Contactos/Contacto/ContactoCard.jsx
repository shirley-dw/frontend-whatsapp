import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { actualizarContacto, deleteContact } from "../../../Fetching/contactosFetching.js";
import "./Contacto.css";

const ContactoCard = ({ contact_id, name, email, phone, thumbnail, status, content = "Sin mensajes", hour = "", onSelect, onDelete }) => {
    const defaultImage = '/imagenes/user.png'; // Ruta de la imagen por defecto
    const imagenes = thumbnail && thumbnail.startsWith("http") ? thumbnail : (thumbnail ? `/imagenes/${thumbnail}` : defaultImage);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        contact_name: name,
        contact_email: email,
        contact_phone: phone
    }); // Estado para actualizar el contacto
    const navigate = useNavigate();
    console.log(contact_id);

    const openModal = (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Maneja la actualización del contacto
    const handleActualizarContacto = async (e) => {
        e.stopPropagation();
        if (!formData.contact_name) {
            console.error("El nombre es requerido");
            return;
        }
        try {
            const updatedContact = await actualizarContacto(contact_id, formData); // Asegúrate de pasar contact_id
            console.log("Contacto actualizado correctamente:", updatedContact);
            closeModal();
        } catch (error) {
            console.error("Error al actualizar el contacto:", error);
        }
    };

    // Maneja la eliminación del contacto
    const handledeleteContact = async (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        try {
            await deleteContact(contact_id);
            console.log("Contacto eliminado correctamente");
            if (onDelete) onDelete(contact_id); // Notifica al componente padre
            closeModal();
        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
        }
    };

    // Navegar al contacto seleccionado
    const handleSelectContacto = (e) => {
        e.stopPropagation(); // Detiene la propagación del evento al contenedor padre
        if (onSelect) {
            onSelect(contact_id);
        } else {
            console.log(`Navigating to /mensaje/${contact_id}`);
            navigate(`/mensaje/${contact_id}`, {
                state: { contact_id, name, email, phone, thumbnail, status, text, hour }
            });
        }
    };

    return (
        <div className="contacto" onClick={handleSelectContacto}>
            <div key={contact_id} className="contact-item">
                <img src={imagenes} alt={name} className="img-profile" />
                <div className="dato-card">
                    <p className="name-card">{name}</p>
                    <div className="ultimo-mensaje">{content}</div>
                    <div className="status-card">{status}</div>
                </div>
                <div className="time-card">{hour}</div>
            </div>
            <div className="options-container-contacto">
                <BsThreeDotsVertical
                    className="options-icon-contacts"
                    onClick={openModal} // Abrir el modal sin interferir con el contenedor
                />
            </div>

            {/* Modal para opciones */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Opciones de contacto"
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <h2>Opciones de contacto</h2>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="form-group">
                        <label htmlFor="contact_name">Nombre:</label>
                        <input
                            type="text"
                            id="contact_name"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                            placeholder="Nuevo nombre"
                        />
                    </div>

                    <button onClick={handleActualizarContacto} className="btn-update">
                        Actualizar Contacto
                    </button>
                    <button onClick={handledeleteContact} className="btn-delete">
                        Eliminar Contacto
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closeModal(); }} className="btn-cancel">
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ContactoCard;
