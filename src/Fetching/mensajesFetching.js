export const ObtenerMensajes = async () => {
  try {
    console.log("Iniciando fetch a la API de mensajes");
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/messages",
      { method: "GET" }
    );
    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`Error al obtener los mensajes: ${response.statusText}`);
    }
    const data = await response.json();
    // Registro de depuración
    console.log("Datos crudos recibidos de la API:", data);
    // Verificación adicional del formato de los datos
    if (!data || !Array.isArray(data)) {
      throw new Error("Los datos obtenidos no son un array de mensajes");
    }
    console.log("Mensajes obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};

export const ObtenerMensajesById = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/messages/" + id,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los mensajes");
    }
    const data = await response.json();
    return data.mensajesOrdenadosAsc;
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    throw error;
  }
};

export const CrearMensajes = async (data) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("access-token"))}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al crear el mensaje");
    }
    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    throw error;
  }
};
