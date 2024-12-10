import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [formState, setFormState] = useState({
        email: ''
    });

    const [errorsState, setErrorsState] = useState({
        email: '',
        general: ''
    });

    const [successMessage, setSuccessMessage] = useState(''); // Estado para manejar el mensaje de éxito

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const responseHTTP = await fetch(
                import.meta.env.VITE_API_URL + '/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formState.email })
            });

            const data = await responseHTTP.json();

            if (!responseHTTP.ok) {
                if (data.errors) {
                    setErrorsState((prevState) => ({
                        ...prevState,
                        email: data.errors.email || '',
                        general: data.message || 'Error desconocido al solicitar el restablecimiento de contraseña'
                    }));
                } else {
                    setErrorsState((prevState) => ({
                        ...prevState,
                        general: data.message || 'Error desconocido al solicitar el restablecimiento de contraseña'
                    }));
                }
            } else {
                setSuccessMessage('Solicitud de restablecimiento de contraseña enviada'); // Establece el mensaje de éxito
                setErrorsState({ email: '', general: '' }); // Reinicia los errores
            }
        } catch (error) {
            console.error('Error al solicitar el restablecimiento de contraseña:', error);
            setErrorsState((prevState) => ({
                ...prevState,
                general: 'Error de conexión. Inténtalo de nuevo más tarde.'
            }));
        }
    };

    return (
        <div className='forgot-password-container'>
            <HeaderRegister />
            <div className='forgot-password-content'>
                <form onSubmit={handleForgotPassword} className='forgot-password-form'>
                    <h1 className='forgot-password-title'>Restablecer contraseña</h1>
                    <p>Al restablecer tu contraseña se enviará un correo electrónico con las instrucciones.</p>
                    <div className='form-group'>
                        <label className='forgot-password-label' htmlFor='email'>Ingresa tu email:</label>
                        <input
                            name='email'
                            id='email'
                            placeholder='tuemail@gmail.com'
                            type='email'
                            onChange={handleChange}
                            value={formState.email}
                            className='forgot-password-input'
                        />
                        {errorsState.email && <span className='error'>{errorsState.email}</span>}
                    </div>
                    <button type='submit' className='forgot-password-button'>Restablecer</button>
                    {successMessage && <div className='success'>{successMessage}</div>} {/* Muestra el mensaje de éxito */}
                    {errorsState.general && <div className='error'>{errorsState.general}</div>}
                    <Link to='/login' className='back-to-login-link'>Iniciar sesión</Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
