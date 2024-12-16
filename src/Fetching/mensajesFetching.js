export const CrearMensajes = async (data) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedItem.token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al crear el mensaje");
    }
    const responseData = await response.json();
    return responseData.data.message;
  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    throw error;
  }
};


/* export const ObtenerMensajes = async () => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const parsedItem = JSON.parse(sessionItem);
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "/api/messages/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${parsedItem.token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los mensajes: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos crudos recibidos de la API:", data);

    // Verificación correcta de la estructura de los datos obtenidos
    if (!data.ok || !Array.isArray(data.data)) {
      throw new Error("Los datos obtenidos no son un array de mensajes");
    }

    console.log("Mensajes obtenidos:", data.data);
    return data.data; // Retorna el array de mensajes
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return [];
  }
};
 */

export const ObtenerMensajesById = async () => {
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
      import.meta.env.VITE_API_URL + "/api/messages/conversation",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedItem.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los mensajes");
    }
    const data = await response.json();
    console.log("Datos obtenidos de la API:", data);

    if (!data.data || !Array.isArray(data.data.conversation)) {
      throw new Error("Los datos obtenidos no son un array de mensajes");
    }

    return data.data
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    throw error;
  }
};


export const getConversation = async (user_id, receiver_id) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    console.log("Access Token en sessionStorage:", sessionItem);

    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }


    const parsedItem = { token: sessionItem };
    if (!parsedItem.token) {
      throw new Error('Token de acceso inválido');
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + `/api/messages/conversation/${user_id}/${receiver_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedItem.token}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener la conversación: ' + response.statusText);
    }

    const responseBody = await response.text();
    console.log("Raw response body:", responseBody);

    try {
      data = JSON.parse(responseBody);
    } catch (error) {
      throw new Error('La respuesta no es un JSON válido');
    }

    console.log("Conversación obtenida:", data);
    return data?.data?.conversation || [];
  } catch (error) {
    console.error("Error en fetch:", error);
    return null;
  }
};



