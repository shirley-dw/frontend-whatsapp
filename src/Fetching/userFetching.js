export const ObtenerInformacionUser = async (id) => {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL + "/api/auth/user/" + id,
            { method: "GET" }
        );
        if (!response.ok) {
            throw new Error("Error al obtener la información del usuario");
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        throw error;
    }
};