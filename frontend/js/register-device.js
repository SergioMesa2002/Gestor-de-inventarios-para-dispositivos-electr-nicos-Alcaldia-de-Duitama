const backendUrl = 'http://localhost:5000/api/devices';

document.getElementById('register-device-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Crear el objeto de datos desde el formulario
    const formData = new FormData(e.target);
    const deviceData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deviceData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Dispositivo registrado exitosamente');
            e.target.reset(); // Limpia el formulario
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error('Error al registrar el dispositivo:', err);
        alert('Hubo un problema al intentar registrar el dispositivo.');
    }
});
