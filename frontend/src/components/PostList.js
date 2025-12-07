import React, { useState, useEffect } from 'react';
import './PostList.css';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('Error al cargar posts:', error);
            });
    }, []);

    const handleDelete = (id) => {
        setPostToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:8080/api/posts/${postToDelete}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setPosts(posts. filter(post => post.id !== postToDelete));
                    setShowModal(false);
                    setPostToDelete(null);
                } else {
                    alert('Error al borrar el post');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al borrar el post');
            });
    };

    const cancelDelete = () => {
        setShowModal(false);
        setPostToDelete(null);
    };

    return (
        <div className="post-list-container">
            <div className="post-list-header">
                <h2>Todos los Posts</h2>
                <span className="post-count">{posts.length} posts</span>
            </div>

            {posts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>No hay posts todavía</h3>
                    <p>¡Sé el primero en crear uno! </p>
                </div>
            ) : (
                <ul className="posts-grid">
                    {posts.map(post => (
                        <li key={post. id} className="post-item">
                            <h3>{post. title}</h3>
                            <p>{post.content}</p>
                            <div className="post-meta">
                                <small className="post-author">
                                    Por: <strong>{post.authorUsername || 'Desconocido'}</strong>
                                </small>
                                <button
                                    className="btn-delete-post"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    🗑️ Borrar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>⚠️ ¿Estás seguro? </h3>
                        <p>Esta acción no se puede deshacer.  El post será eliminado permanentemente.</p>
                        <div className="modal-buttons">
                            <button className="btn-delete" onClick={confirmDelete}>
                                Sí, borrar
                            </button>
                            <button className="btn-cancel" onClick={cancelDelete}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostList;