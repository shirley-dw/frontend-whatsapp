
//Crear contacto para un usuario
export const CreateContactForUser = async (formData, user_id, token) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/api/contacts/add/` + user_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Usar el token directamente
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

//Obtener contactos de un usuario
export const getUserContacts = async () => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    // Elimina JSON.parse porque el token es una cadena
    const parsedItem = { token: sessionItem }; // Asume que el token es la cadena almacenada
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/contacts/userContacts",
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

    if (!data || !Array.isArray(data.data.contacts)) {
      throw new Error("Los datos obtenidos no son un array de contactos");
    }

    return data.data.contacts;
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};

// Obtener contacto por su id
export const ObtenerContactosById = async (contact_id) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }

    console.log('Token de acceso:', parsedItem.token); // Log del token

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/contacts/contacts/" + contact_id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedItem.token}`,
        },
      }
    );

    console.log('Respuesta del servidor:', response); // Log de la respuesta completa

    // Verificamos que la respuesta es válida antes de intentar parsearla
    if (!response.ok) {
      const errorMessage = await response.text(); // Obtén el texto si no es JSON
      console.error('Error en la respuesta:', errorMessage); // Log de error de respuesta
      throw new Error(`Error al obtener los contactos: ${errorMessage}`);
    }

    // Asegúrate de que la respuesta sea JSON
    const data = await response.json();
    console.log('Datos obtenidos:', data); // Log de los datos obtenidos
    return data.contacts; // Si la respuesta es correcta, devuelve los contactos
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error; // Re-lanza el error para que pueda ser manejado en el componente
  }
};


//Actualizar contacto por ID
export const UpdateContact = async (contact_id, data) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error("No se encontró el token de acceso en sessionStorage");
    }

    const token = sessionItem;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contacts/contacts/${contact_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el contacto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en UpdateContact:", error);
    throw new Error("Error al actualizar el contacto");
  }
};


// Eliminar contacto por id
export const DeleteContact = async (contact_id) => {
  try {
    console.log("Iniciando DeleteContact...");
    console.log("contact_id recibido:", contact_id);

    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      console.error("Token no encontrado en sessionStorage");
      throw new Error("No se encontró el token de acceso en sessionStorage");
    }
    console.log("Token enviado en la petición DELETE:", sessionItem);

    const token = sessionItem;

    const url = `${import.meta.env.VITE_API_URL}/api/contacts/delete/${contact_id}`;
    console.log("URL construida para DELETE:", url);

    // Realiza la petición
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // El token incluye el user_id
      },
    });

    // Log para la respuesta
    console.log("Respuesta de la API:", response);

    // Valida el estado de la respuesta
    if (!response.ok) {
      console.error("Error en la respuesta de la API:", response.status, response.statusText);
      throw new Error("Error al eliminar el contacto");
    }

    // Devuelve el JSON de la respuesta
    const data = await response.json();
    console.log("Datos devueltos por la API:", data);
    return data;

  } catch (error) {
    console.error("Error en DeleteContact:", error.message);
    throw error;
  }
};
