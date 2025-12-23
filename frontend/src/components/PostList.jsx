import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';  // ✅ Importar
import './PostList.css';

function PostList() {

    const currentUser = getCurrentUser();  // ✅ Obtener usuario logueado
    const [posts, setPosts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

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

    // ========== ELIMINAR ==========
    const handleDelete = (id) => {
        setPostToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:8080/api/posts/${postToDelete}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response. ok) {
                    setPosts(posts.filter(post => post.id !== postToDelete));
                    setShowDeleteModal(false);
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
        setShowDeleteModal(false);
        setPostToDelete(null);
    };

    // ========== EDITAR ==========
    const handleEdit = (post) => {
        setPostToEdit(post);
        setEditTitle(post.title);
        setEditContent(post.content);
        setShowEditModal(true);
    };

    const confirmEdit = () => {
        if (!editTitle.trim() || !editContent.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        fetch(`http://localhost:8080/api/posts/${postToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: editTitle.trim(),
                content: editContent.trim(),
                category: postToEdit.category
            })
        })
            .then(response => response.json())
            .then(updatedPost => {
                // Actualizar el post en la lista
                setPosts(posts.map(post =>
                    post.id === updatedPost.id ? updatedPost : post
                ));
                setShowEditModal(false);
                setPostToEdit(null);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al editar el post');
            });
    };

    const cancelEdit = () => {
        setShowEditModal(false);
        setPostToEdit(null);
        setEditTitle('');
        setEditContent('');
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

                        <li key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post. content}</p>
                            <div className="post-meta">
                                <small className="post-author">
                                    Por:  <strong>{post.authorUsername || 'Desconocido'}</strong>
                                </small>

                                {/* ✅ Mostrar botones SOLO si eres el autor */}
                                {currentUser && currentUser === post.authorUsername && (
                                    <div className="post-actions">
                                        <button
                                            className="btn-edit-post"
                                            onClick={() => handleEdit(post)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            className="btn-delete-post"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            🗑️ Borrar
                                        </button>
                                    </div>
                                )}
                            </div>

                        </li>

                    ))}

                </ul>
            )}

            {/* ========== MODAL DE ELIMINAR ========== */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>⚠️ ¿Estás seguro?</h3>
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

            {/* ========== MODAL DE EDITAR ========== */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content modal-edit">
                        <h3>✏️ Editar Post</h3>

                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Título del post"
                            />
                        </div>

                        <div className="form-group">
                            <label>Contenido</label>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Contenido del post"
                                rows="6"
                            />
                        </div>

                        <div className="modal-buttons">
                            <button className="btn-save" onClick={confirmEdit}>
                                💾 Guardar
                            </button>
                            <button className="btn-cancel" onClick={cancelEdit}>
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