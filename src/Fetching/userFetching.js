export const ObtenerInformacionUser = async (user_id) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/auth/user/${user_id}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener la información del usuario. Código: ${response.status}`);
        }

        const data = await response.json();

        return data.user;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);
        throw error;
    }
};
