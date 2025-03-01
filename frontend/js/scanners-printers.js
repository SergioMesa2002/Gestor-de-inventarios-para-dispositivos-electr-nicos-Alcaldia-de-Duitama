const backendUrl = 'https://gestor-de-inventarios-para-dispositivos.onrender.com/api/departments';
const form = document.getElementById('department-form');
const departmentsContainer = document.getElementById('departments-container');

// Registrar un nuevo departamento
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const numPrinters = parseInt(document.getElementById('numPrinters').value);
    const numScanners = parseInt(document.getElementById('numScanners').value);

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, numPrinters, numScanners }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Departamento registrado exitosamente.');
            form.reset();
            fetchDepartments(); // Actualizar lista de departamentos
        } else {
            alert(result.message || 'Error al registrar el departamento.');
        }
    } catch (error) {
        console.error('Error al registrar el departamento:', error);
        alert('Hubo un error al intentar registrar el departamento.');
    }
});

// Obtener todos los departamentos y mostrarlos
async function fetchDepartments() {
    try {
        const response = await fetch(backendUrl);
        const departments = await response.json();

        // Limpiar contenedor
        departmentsContainer.innerHTML = '';

        // Crear tarjetas para cada departamento
        departments.forEach((dept) => {
            const departmentCard = document.createElement('div');
            departmentCard.className = 'card';
            departmentCard.innerHTML = `
                <h3>${dept.nombre}</h3>
                <p>Impresoras: 
                    <input type="number" value="${dept.numPrinters}" min="0" data-id="${dept._id}" class="numPrinters-input">
                </p>
                <p>Escáneres: 
                    <input type="number" value="${dept.numScanners}" min="0" data-id="${dept._id}" class="numScanners-input">
                </p>
                <button class="update-button" data-id="${dept._id}">Actualizar</button>
            `;
            departmentsContainer.appendChild(departmentCard);
        });

        // Agregar eventos a los botones de actualizar
        document.querySelectorAll('.update-button').forEach((button) => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const numPrintersInput = document.querySelector(`.numPrinters-input[data-id="${id}"]`);
                const numScannersInput = document.querySelector(`.numScanners-input[data-id="${id}"]`);
                const numPrinters = parseInt(numPrintersInput.value);
                const numScanners = parseInt(numScannersInput.value);

                await updateDepartment(id, numPrinters, numScanners);
            });
        });
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
        alert('Hubo un error al cargar los departamentos.');
    }
}

// Actualizar un departamento
async function updateDepartment(id, numPrinters, numScanners) {
    try {
        const response = await fetch(`${backendUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numPrinters, numScanners }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Departamento actualizado exitosamente.');
            fetchDepartments(); // Actualizar lista
        } else {
            alert(result.message || 'Error al actualizar el departamento.');
        }
    } catch (error) {
        console.error('Error al actualizar el departamento:', error);
        alert('Hubo un error al intentar actualizar el departamento.');
    }
}


// Cargar departamentos al iniciar
fetchDepartments();
