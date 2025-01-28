document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:5000/api/wifi-devices"; // Ajustar si el backend está en otro puerto o ruta

    // Referencias a elementos del DOM
    const addDeviceForm = document.getElementById("addDeviceForm");
    const updateDeviceForm = document.getElementById("updateDeviceForm");
    const deviceList = document.getElementById("deviceList");
    const updateSection = document.getElementById("updateSection");
    const cancelUpdate = document.getElementById("cancelUpdate");

    // Ocultar formulario de actualización
    updateSection.style.display = "none";

    // Cargar todos los dispositivos
    const loadDevices = async () => {
        try {
            const response = await fetch(baseUrl);
            const devices = await response.json();
            renderDevices(devices);
        } catch (error) {
            console.error("Error al cargar los dispositivos:", error);
        }
    };

    // Renderizar dispositivos en la tabla
    const renderDevices = (devices) => {
        deviceList.innerHTML = "";
        devices.forEach((device) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${device.dispositivo}</td>
                <td>${device.direccion_ip}</td>
                <td>${device.ubicacion}</td>
                <td>
                    <button onclick="editDevice('${device._id}')">Editar</button>
                    <button onclick="deleteDevice('${device._id}')">Eliminar</button>
                </td>
            `;
            deviceList.appendChild(row);
        });
    };

    // Crear un nuevo dispositivo
    addDeviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newDevice = {
            dispositivo: addDeviceForm.dispositivo.value,
            direccion_ip: addDeviceForm.direccion_ip.value,
            ubicacion: addDeviceForm.ubicacion.value,
        };

        try {
            await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDevice),
            });
            addDeviceForm.reset();
            loadDevices();
        } catch (error) {
            console.error("Error al agregar el dispositivo:", error);
        }
    });

    // Editar dispositivo
    window.editDevice = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`);
            const device = await response.json();

            document.getElementById("updateDeviceId").value = id;
            document.getElementById("updateDispositivo").value = device.dispositivo;
            document.getElementById("updateDireccionIp").value = device.direccion_ip;
            document.getElementById("updateUbicacion").value = device.ubicacion;

            updateSection.style.display = "block";
        } catch (error) {
            console.error("Error al cargar el dispositivo:", error);
        }
    };

    // Actualizar dispositivo
    updateDeviceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("updateDeviceId").value;
        const updatedDevice = {
            dispositivo: document.getElementById("updateDispositivo").value,
            direccion_ip: document.getElementById("updateDireccionIp").value,
            ubicacion: document.getElementById("updateUbicacion").value,
        };

        try {
            await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedDevice),
            });
            updateDeviceForm.reset();
            updateSection.style.display = "none";
            loadDevices();
        } catch (error) {
            console.error("Error al actualizar el dispositivo:", error);
        }
    });

    // Cancelar edición
    cancelUpdate.addEventListener("click", () => {
        updateSection.style.display = "none";
        updateDeviceForm.reset();
    });

    // Eliminar dispositivo
    window.deleteDevice = async (id) => {
        try {
            await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
            loadDevices();
        } catch (error) {
            console.error("Error al eliminar el dispositivo:", error);
        }
    };

    // Cargar dispositivos al cargar la página
    loadDevices();
});
