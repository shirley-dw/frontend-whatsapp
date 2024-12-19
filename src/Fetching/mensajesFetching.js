export const CreateMessage = async (user_id, receiver_id, content) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    console.log("Access Token en sessionStorage:", sessionItem);

    if (!sessionItem) {
      throw new Error('No se encontró el token de acceso en sessionStorage');
    }

    const data = {
      user_id: user_id,       // Agrega explícitamente el user_id
      receiver_id: receiver_id, // Agrega explícitamente el receiver_id
      content: content
    };
    console.log('el user_id es:', user_id);
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/messages/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionItem}`,
      },
      body: JSON.stringify(data), // Envía los datos completos
    });

    if (!response.ok) {
      throw new Error("Error al crear el mensaje");
    }

    const responseData = await response.json();
    return responseData.data.message; // Retorna el mensaje creado
  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    throw error;
  }
};


export const GetConversation = async (user_id, receiver_id) => {
  try {
    const sessionItem = sessionStorage.getItem("access-token");
    console.log("Access Token en sessionStorage:", sessionItem);

    if (!sessionItem) throw new Error("No se encontró el token de acceso");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/messages/conversation/${user_id}/${receiver_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionItem}`,
        },
      }
    );

    if (!response.ok) throw new Error("Error al obtener la conversación");

    const responseData = await response.json();
    console.log("Raw response body:", responseData);

    // Acceder al array de mensajes dentro de 'data.conversation'
    return responseData.data.conversation || [];
  } catch (error) {
    console.error("Error en fetch:", error);
    throw error;
  }
};


// Obtener el último mensaje de la conversación
export const getLastMessage = async (user_id, receiver_id) => {
  try {
    const response = await fetch(
      import.meta.VITE_API_URL + `/api/messages/last-message/${user_id}/${receiver_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`, // Si se requiere un token de autenticación
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener el último mensaje');
    }

    return data.data; // Esto te devolverá el último mensaje obtenido
  } catch (error) {
    console.error('Error:', error);
    return null; // En caso de error
  }
};


