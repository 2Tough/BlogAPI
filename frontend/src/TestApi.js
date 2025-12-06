import React, { useState, useEffect } from 'react';

function TestApi() {
    const [message, setMessage] = useState('Cargando...');

    useEffect(() => {
        // URL endpoint real de tu backend
        fetch('http://localhost:8080/api/test')
            .then(response => response. text())
            .then(data => setMessage(data))
            . catch(error => setMessage('Error: ' + error. message));
    }, []);

    return (
        <div>
            <h1>Prueba de conexión Backend → Frontend</h1>
            <p><strong>Respuesta del servidor:</strong> {message}</p>
        </div>
    );
}

export default TestApi;