import React, { useState } from 'react';
import './CreateContact.css';
import { CrearContacto } from '../../../Fetching/contactosFetching.js';

const CreateContact = ({ onContactCreated }) => {
    const [formData, setFormData] = useState({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        text: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null })); // Limpiar errores al modificar el campo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios antes de enviar
        const newErrors = {};
        if (!formData.contact_name) newErrors.contact_name = 'El nombre es obligatorio';
        if (!formData.contact_email) newErrors.contact_email = 'El correo es obligatorio';
        if (!formData.contact_phone) newErrors.contact_phone = 'El teléfono es obligatorio';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const sessionItem = sessionStorage.getItem('access-token');
            const parsedItem = JSON.parse(sessionItem);
            const userId = parsedItem.userId;

            console.log('Datos enviados al backend:', formData);

            const message = await CrearContacto(formData, userId);

            setSuccessMessage(message);
            setFormData({ contact_name: '', contact_email: '', contact_phone: '', text: '' });
            if (onContactCreated) onContactCreated();
        } catch (error) {
            console.error('Error al crear el contacto:', error.message);
            setErrors({ general: error.message });
        }
    };

    return (
        <div className="create-contact">
            <h2>Crear nuevo contacto</h2>
            <form onSubmit={handleSubmit} className="form-modal-create-contact">
                <div className="form-group">
                    <label htmlFor="contact_name">Nombre</label>
                    <input
                        type="text"
                        id="contact_name"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                        required
                    />
                    {errors.contact_name && <p className="error">{errors.contact_name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contact_email">Correo electrónico</label>
                    <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        placeholder="Ingresa el correo"
                        required
                    />
                    {errors.contact_email && <p className="error">{errors.contact_email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contact_phone">Teléfono</label>
                    <input
                        type="text"
                        id="contact_phone"
                        name="contact_phone"
                        value={formData.contact_phone}
                        onChange={handleChange}
                        placeholder="Ingresa el teléfono"
                        required
                    />
                    {errors.contact_phone && <p className="error">{errors.contact_phone}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="text">Nota</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Ingresa una nota (opcional)"
                    />
                </div>

                <button type="submit" className="btn-submit">Crear contacto</button>
            </form>

            {successMessage && <p className="success">{successMessage}</p>}
            {errors.general && <p className="error">{errors.general}</p>}
        </div>
    );
};

export default CreateContact;
