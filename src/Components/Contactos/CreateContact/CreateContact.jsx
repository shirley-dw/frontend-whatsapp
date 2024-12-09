import React, { useState } from 'react';
import './CreateContact.css';
import { CreateContactForUser } from '../../../Fetching/contactosFetching.js'; // Ajusta la ruta si es necesario
import useModal from '../../../hooks/useModal.js';
const CreateContact = ({ onContactCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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

        try {
            const sessionItem = sessionStorage.getItem('access-token');
            const parsedItem = JSON.parse(sessionItem);
            const userId = parsedItem.userId;

            const message = await CreateContactForUser(formData, userId);

            setSuccessMessage(message);
            setFormData({ name: '', email: '', phone: '', text: '' }); // Reiniciar formulario
            onContactCreated && onContactCreated(); // Llama a la función de actualización después de crear el contacto
        } catch (error) {
            console.error('Error al crear el contacto:', error.message);
            setErrors({ general: error.message });
        }
    };

    return (
        <div className="create-contact">

            <h2>Crear nuevo contacto</h2>
            <form onSubmit={handleSubmit} className='form-modal-create-contact'>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                        required
                    />
                    {errors.name && <p className="error">{errors.name.join(', ')}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingresa el correo"
                        required
                    />
                    {errors.email && <p className="error">{errors.email.join(', ')}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ingresa el teléfono"
                        required
                    />
                    {errors.phone && <p className="error">{errors.phone.join(', ')}</p>}
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
