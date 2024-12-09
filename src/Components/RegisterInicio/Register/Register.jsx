import React, { useState } from 'react';
import useForm from '../../../hooks/useForm.js';
import { useNavigate } from 'react-router-dom';
import HeaderRegister from '../HeaderRegister/HeaderRegister.jsx';
import IndicationRegister from '../IndicationRegister/IndicationRegister.jsx';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    // Estado del formulario
    const { formState, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    // Estado de los errores
    const [errorsState, setErrorsState] = useState({
        name: '',
        email: '',
        password: '',
        general: ''
    });

    // Manejo de eventos del formulario para el registro
    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const responseHTTP = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            console.log('Respuesta HTTP:', responseHTTP);

            const data = await responseHTTP.json();

            console.log('Datos recibidos:', data);

            if (!responseHTTP.ok) {
                // Manejo de errores específicos de campos
                if (data.errors) {
                    setErrorsState((prevState) => ({
                        ...prevState,
                        ...data.errors
                    }));
                } else {
                    // Error general si no hay errores específicos
                    setErrorsState((prevState) => ({
                        ...prevState,
                        general: data.message || 'Error desconocido al registrar'
                    }));
                }
            } else {
                // Si el registro es exitoso, redireccionar a la página de login
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setErrorsState((prevState) => ({
                ...prevState,
                general: 'Error de conexión. Inténtalo de nuevo más tarde.'
            }));
        }
    };

    return (
        <div className='register-container'>
            <HeaderRegister />
            <div className='register-content'>
                <div className='indication-register-container'>
                    <IndicationRegister />
                </div>
                <form onSubmit={handleRegister} className='register-form'>
                    <h1 className='register-title'>Registrate en WhatsApp Web</h1>
                    <div className='form-group-register'>
                        <label className='register-label' htmlFor='name'>Ingresa tu nombre:</label>
                        <input
                            name='name'
                            id='name'
                            placeholder='Nombre completo'
                            type='text'
                            onChange={handleChange}
                            value={formState.name}
                            className='register-input'
                        />
                        {errorsState.name && <span className='error'>{errorsState.name}</span>}
                    </div>
                    <div className='form-group-register'>
                        <label className='register-label' htmlFor='email'>Ingresa tu email:</label>
                        <input
                            name='email'
                            id='email'
                            placeholder='tuemail@gmail.com'
                            type='email'
                            onChange={handleChange}
                            value={formState.email}
                            className='register-input'
                        />
                        {errorsState.email && <span className='error'>{errorsState.email}</span>}
                    </div>
                    <div className='form-group-register'>
                        <label className='register-label' htmlFor='password'>Ingresa tu contraseña:</label>
                        <input
                            name='password'
                            id='password'
                            placeholder='*********'
                            type='password'
                            onChange={handleChange}
                            value={formState.password}
                            className='register-input'
                        />
                        {errorsState.password && <span className='error'>{errorsState.password}</span>}
                    </div>
                    <button type='submit' className='register-button'>Registrar</button>
                    {errorsState.general && <div className='error'>{errorsState.general}</div>}
                </form>
            </div>
        </div>
    );
};

export default Register;
