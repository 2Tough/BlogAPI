import './App.css';

import Navbar from './components/Navbar'
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Register from './services/Register'
import Login from './services/Login'
import { useState } from 'react';

function App() {
    const [refreshPosts, setRefreshPosts] = useState(0);
    const [currentView, setCurrentView] = useState('home');  // ✅ Nueva:  controla qué página mostrar

    const handlePostCreated = () => {
        setRefreshPosts(prev => prev + 1);
    };

    const handleAuthSuccess = () => {
        // Cuando login/register sea exitoso, volver al home
        setCurrentView('home');
        setRefreshPosts(prev => prev + 1);  // Refrescar posts
    };

    return (
        <div className="App">
            {/* Navbar siempre visible */}
            <Navbar onViewChange={setCurrentView} currentView={currentView} />

            {/* Mostrar la vista según currentView */}
            {currentView === 'home' && (
                <>
                    <header className="app-header">
                        <h1>📝 Mi Blog</h1>
                        <p>Comparte tus ideas con el mundo</p>
                    </header>

                    <main className="main-content">
                        <CreatePost onPostCreated={handlePostCreated} />
                        <PostList key={refreshPosts} />
                    </main>
                </>
            )}

            {currentView === 'login' && (
                <Login onLoginSuccess={handleAuthSuccess} />
            )}

            {currentView === 'register' && (
                <Register onRegisterSuccess={handleAuthSuccess} />
            )}
        </div>
    );
}
export default App;