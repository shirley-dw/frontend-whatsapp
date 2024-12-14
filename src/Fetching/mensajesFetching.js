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


export const ObtenerMensajes = async () => {
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


export const getConversation = async (receiver_id) => {
  const userId = sessionStorage.getItem("user_id"); // Obtén el user_id del sessionStorage

  if (!userId) {
    throw new Error("User ID no encontrado en sessionStorage");
  }

  try {
    const response = await fetch(`/api/conversations/${receiver_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`, // Usa el userId para la autenticación
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener la conversación");
    }

    return data.data.conversation; // Devuelve la conversación obtenida
  } catch (error) {
    console.error("Error al obtener la conversación:", error);
    throw error; // Lanza el error para manejarlo en el componente que llama a esta función
  }
};


