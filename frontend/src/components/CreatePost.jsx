import React, { useState } from 'react';
import { getCurrentUser } from '../services/authService';
import './CreatePost.css';

function CreatePost({ onPostCreated }) {
    const currentUser = getCurrentUser();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // Solo validar título y contenido
        if (!title. trim() || !content.trim()) {
            setError('Por favor completa título y contenido');
            return;
        }

        setIsSubmitting(true);

        const newPost = {
            title:  title.trim(),
            content: content.trim(),
            authorUsername: currentUser || null  // ✅ Si no hay usuario, enviar null
        };

        fetch('http://localhost:8080/api/posts', {
            method:  'POST',
            headers:  {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                console.log('📥 Response status:', response.status);
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(errorText => {
                        console.error('❌ Error del backend:', errorText);
                        throw new Error(errorText || 'Error al crear el post');
                    });
                }
            })
            .then(data => {
                console.log('✅ Post creado:', data);
                setTitle('');
                setContent('');
                setIsSubmitting(false);

                setSuccess('¡Post creado exitosamente! ');

                setTimeout(() => {
                    setSuccess('');
                }, 3000);

                if (onPostCreated) {
                    onPostCreated(data);
                }
            })
            .catch(error => {
                console.error('❌ Error completo:', error);
                setError(`Error: ${error.message}`);
                setIsSubmitting(false);
            });
    };

    return (
        <div className="create-post-container">
            <h2>✍️ Crear Nuevo Post</h2>

            {error && (
                <div className="message error-message">
                    ⚠️ {error}
                </div>
            )}

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
                        onChange={(e) => setTitle(e.target. value)}
                        placeholder="Escribe un título llamativo..."
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Comparte tus ideas..."
                        rows="6"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor</label>
                    {currentUser ? (
                        <input
                            type="text"
                            id="author"
                            value={currentUser}
                            disabled
                            style={{ background: '#e8f5e9', fontWeight: 'bold', color: '#2e7d32' }}
                        />
                    ) : (
                        <input
                            type="text"
                            id="author"
                            value="Anónimo"
                            disabled
                            style={{ background: '#f5f5f5', color: '#666' }}
                        />
                    )}
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