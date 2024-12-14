export const CrearContacto = async (formData, userId) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }
    console.log("Datos enviados al servidor:", formData);

    const response = await fetch(
      import.meta.env.VITE_API_URL + `/api/contacts/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedItem.token}`,
        },
        body: JSON.stringify(formData), // Aquí enviamos los datos del contacto
      }
    );
    if (!response.ok) {
      throw new Error("Error al crear el contacto");
    }
    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    throw error;
  }
};



export const ObtenerContactos = async () => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/contacts/contacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedItem.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener los contactos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos obtenidos de la API:", data);

    if (!data || !Array.isArray(data.contacts)) {
      throw new Error("Los datos obtenidos no son un array de contactos");
    }

    return data.contacts; // Retorna el array de contactos
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};


export const ObtenerContactosById = async (id) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/contacts/" + id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedItem.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }

    const data = await response.json();
    return data.contacts;
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }

};


export const actualizarContacto = async (id, data) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }


    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/contacts/${id}`, {
      method: 'PUT', // Método de actualización
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedItem.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el contacto');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el contacto');
  }
};

// Ejemplo para eliminar un contacto
export const eliminarContacto = async (id) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/api/contacts/contacts/${id}`, {
      method: 'DELETE', // Método de eliminación
      headers: {
        Authorization: `Bearer ${parsedItem.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el contacto');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el contacto');
  }
};


