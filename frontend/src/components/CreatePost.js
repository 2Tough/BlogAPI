import React, { useState } from 'react';
import './CreatePost.css';

function CreatePost({ onPostCreated }) {
    // Estados para los campos del formulario
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorUsername, setAuthorUsername] = useState('');

    // Estados para el estado de la petición
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para mensajes
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e. preventDefault();

        // Limpiar mensajes anteriores
        setError('');
        setSuccess('');

        // Validación: verificar que los campos no estén vacíos
        if (!title.trim() || !content.trim() || !authorUsername. trim()) {
            setError('Por favor completa todos los campos');
            return; // Detener la ejecución
        }

        // Marcar que estamos enviando (deshabilita el formulario)
        setIsSubmitting(true);

        // Crear el objeto que vamos a enviar al backend
        const newPost = {
            title: title.trim(),
            content: content.trim(),
            authorUsername: authorUsername. trim()
        };

        // Enviar petición POST al backend
        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                // Verificar si la respuesta fue exitosa
                if (response. ok) {
                    return response. json(); // Convertir a JSON
                } else {
                    throw new Error('Error al crear el post');
                }
            })
            .then(data => {
                // Éxito: limpiar el formulario
                setTitle('');
                setContent('');
                setAuthorUsername('');
                setIsSubmitting(false);

                // Mostrar mensaje de éxito
                setSuccess('¡Post creado exitosamente!');

                // Limpiar el mensaje después de 3 segundos
                setTimeout(() => {
                    setSuccess('');
                }, 3000);

                // Notificar al componente padre (App.js) para refrescar la lista
                if (onPostCreated) {
                    onPostCreated(data);
                }
            })
            . catch(error => {
                // Error: mostrar mensaje de error
                console.error('Error:', error);
                setError('Error al crear el post.  Intenta nuevamente.');
                setIsSubmitting(false);
            });
    };

    return (
        <div className="create-post-container">
            <h2>✍️ Crear Nuevo Post</h2>

            {/* Mostrar mensaje de error si existe */}
            {error && (
                <div className="message error-message">
                    ⚠️ {error}
                </div>
            )}

            {/* Mostrar mensaje de éxito si existe */}
            {success && (
                <div className="message success-message">
                    ✅ {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Escribe un título llamativo..."
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e. target.value)}
                        placeholder="Comparte tus ideas..."
                        rows="6"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor</label>
                    <input
                        type="text"
                        id="author"
                        value={authorUsername}
                        onChange={(e) => setAuthorUsername(e.target.value)}
                        placeholder="Tu nombre"
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '📤 Publicando...' : '📝 Publicar Post'}
                </button>
            </form>
        </div>
    );
}

export default CreatePost;