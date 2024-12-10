import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecoveryPassword.css';
import HeaderRegister from '../HeaderRegister/HeaderRegister';

const RecoveryPassword = () => {
    const { reset_token } = useParams();
    const [formState, setFormState] = useState({
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleRecoveryPassword = async (event) => {
        event.preventDefault();
        if (formState.password !== formState.confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/api/auth/reset-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reset_token, password: formState.password })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMessage(data.message);
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setMessage('Error al restablecer la contraseña');
        }
    };

    return (
        <div className="recovery-container">
            <HeaderRegister />
            <form onSubmit={handleRecoveryPassword} className="recovery-form">
                <h2 className="recovery-title">Recuperar Contraseña</h2>
                <div className="form-group">
                    <label htmlFor="password" className="recovery-label">Nueva contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        placeholder='Nueva contraseña'
                        className="recovery-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="recovery-label">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        placeholder='Confirmar contraseña'
                        onChange={handleChange}
                        className="recovery-input"
                        required
                    />
                </div>
                {message && <p className="error">{message}</p>}
                <button type="submit" className="recovery-button">Restablecer contraseña</button>
                <Link to="/login" className="register-link">Iniciar Sesión</Link>
            </form>

        </div>
    );
};

export default RecoveryPassword;

