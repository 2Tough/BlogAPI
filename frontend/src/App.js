import './App.css';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import { useState } from 'react';

function App() {
    const [refreshPosts, setRefreshPosts] = useState(0);

    const handlePostCreated = () => {
        // Forzar actualización de la lista
        setRefreshPosts(prev => prev + 1);
    };

    return (
        <div className="App">
            <header className="app-header">
                <h1>📝 Mi Blog</h1>
                <p>Comparte tus ideas con el mundo</p>
            </header>

            <main className="main-content">
                <CreatePost onPostCreated={handlePostCreated} />
                <PostList key={refreshPosts} />
            </main>
        </div>
    );
}

export default App;