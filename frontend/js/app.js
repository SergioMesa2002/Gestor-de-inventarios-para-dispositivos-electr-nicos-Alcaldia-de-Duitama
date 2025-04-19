const backendUrl = 'https://gestor-de-inventarios-para-dispositivos.onrender.com/api/users'; // Ruta base del backend

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById('username').value; // Ahora usamos 'username'
    const password = document.getElementById('password').value;

    try {
        // Realizar la petición al backend
        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username, // Enviamos el nombre de usuario
                password,
            }),
        });

        const result = await response.json();
        console.log('Respuesta del servidor:', result); // Depuración

        if (response.ok) {
            alert('Inicio de sesión exitoso.');
            window.location.href = '/dashboard.html'; // Redirige al usuario a otra página
        } else {
            alert(result.message || 'Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Hubo un error al intentar iniciar sesión.');
    }
});
