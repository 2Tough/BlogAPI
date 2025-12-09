const API_URL = 'http://localhost:8080/api/auth'

export const register = async (username, email, password) => {
    // 1. Hacer un fetch a 'http://localhost:8080/api/auth/register'
    const response = await fetch(`${API_URL}/register`, {
        // 2. Metodo POST
        method: 'POST',
        // 3. Headers: { 'Content-Type':  'application/json' }
        headers: {
            'Content-Type': 'application/json'
        },
        // 4. Body: JSON.stringify({ username, email, password })
        body: JSON.stringify({username, email, password})
    })

    // 5. Si la respuesta NO es OK (! response.ok), lanzar un error
    if (!response.ok) {
        const error = await.response.text();
        throw new Error(error)
    }

    // 6. Convertir la respuesta a JSON

    // 7. Guardar en localStorage:
    //    - localStorage.setItem('token', data.token)
    //    - localStorage.setItem('username', data.username)

    // 8. Retornar data
};