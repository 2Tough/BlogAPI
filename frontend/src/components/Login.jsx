import React, { useState } from 'react';
import { login } from '../services/authService';
import './Auth.css';  // Vamos a crear este CSS después

function Login({ onLoginSuccess }) {
    // 1. ESTADOS (para guardar lo que escribe el usuario)
    const [username, setUsername] = useState('');
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
            // await login(?? ?, ??? , ???);
            const response = await login(username, password)
            alert('✅ Usuario logeado exitosamente!');
            if (onLoginSuccess) {
                onLoginSuccess();
            }

        } catch (err) {
            // Si hubo error, lo mostramos
            setError(err.message || 'Error al logear usuario');
        } finally {
            setIsSubmitting(false);  // Habilitamos el botón de nuevo
        }
    };

    // 3. RETURN:  EL HTML (JSX) DEL FORMULARIO
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>📝 Login</h2>

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

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target. value)}
                            placeholder="Elige un password"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '🔄 Logeando...' : '✨ Logeado'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;