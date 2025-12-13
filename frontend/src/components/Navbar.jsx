import React from 'react';
import { getCurrentUser, logout } from '../services/authService';
import './Navbar.css';

function Navbar({ onViewChange }) {
    const user = getCurrentUser();

    const handleLogout = () => {
        logout()
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => onViewChange('home')}>
                📝 Mi Blog
            </div>

            <div className="navbar-links">
                <button onClick={() => onViewChange('home')}>
                    🏠 Inicio
                </button>

                {/* Si HAY usuario logueado */}
                {user ?  (
                    <>
                        <span className="user-badge">👤 {user}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            🚪 Salir
                        </button>
                    </>
                ) : (
                    /* Si NO hay usuario logueado */
                    <>
                        <button onClick={() => onViewChange('login')}>
                            🔐 Login
                        </button>
                        <button onClick={() => onViewChange('register')}>
                            📝 Registro
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;