import React, { useState } from 'react';
import { register } from '../services/authService';
import './Auth.css';  // Vamos a crear este CSS después

function Register({ onRegisterSuccess }) {
    // 1. ESTADOS (para guardar lo que escribe el usuario)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. FUNCIÓN QUE SE EJECUTA AL ENVIAR EL FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();  // Evita que la página se recargue

        setError('');  // Limpia errores anteriores
        setIsSubmitting(true);  // Deshabilitamos el botón mientras se envía

        try {
            // TODO: Llama a la función register del servicio
            // await register(?? ?, ??? , ???);

            alert('✅ Usuario registrado exitosamente!');

            // Si el padre (App.jsx) pasó una función onRegisterSuccess, la llamamos
            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
        } catch (err) {
            // Si hubo error, lo mostramos
            setError(err.message || 'Error al registrar usuario');
        } finally {
            setIsSubmitting(false);  // Habilitamos el botón de nuevo
        }
    };

    // 3. RETURN:  EL HTML (JSX) DEL FORMULARIO
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>📝 Registro</h2>

                {/* Mostrar mensaje de error si existe */}
                {error && (
                    <div className="message error-message">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* TODO: INPUT PARA USERNAME */}
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target. value)}
                            placeholder="Elige un usuario"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* TODO: INPUT PARA EMAIL */}
                    {/* Copia el de arriba y cambia:
                        - htmlFor a "email"
                        - type a "email"
                        - value a {email}
                        - onChange a setEmail
                        - placeholder a "tu@email.com"
                    */}

                    {/* TODO: INPUT PARA PASSWORD */}
                    {/* Copia el de username y cambia:
                        - htmlFor a "password"
                        - type a "password"
                        - value a {password}
                        - onChange a setPassword
                        - placeholder a "Mínimo 6 caracteres"
                    */}

                    {/* BOTÓN DE ENVIAR */}
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '🔄 Registrando...' : '✨ Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register; email, password);