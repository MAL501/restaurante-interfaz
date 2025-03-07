const API_URL = "http://localhost:8080/reservas";
const token = localStorage.getItem("token");


/**
 * Todo esto es lo primero que tenemos que exportar
 */
export const login = async (username, password) => {
  try {
      const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
          return false;  
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);  
      return true;  
  } catch (error) {
      console.error("Error:", error);
      return false;  
  }
};


export const register = async(username, email, password,password2) =>{
console.log(username);
console.log(password);
try {
    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username,email , password,password2 })
    });
    console.log(response)

    if (!response.ok) {
        alert("No se ha podido registrar. Asegurese de rellenar todos los campos correctamente");
        throw new Error("Error en la autenticación");
    }

} catch (error) {
    console.error("Error:", error);
}

}

export const obtenerReservas = async () => {

  if (!token) {
    console.error("No hay token, inicia sesión.");
    return [];
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`);
      throw new Error("Error en la petición de reservas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};
export const obtenerDisponibilidad = async () => {

  try {
      const response = await fetch("http://localhost:8080/disponibilidad", {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
          throw new Error("Error al obtener disponibilidad");
      }

      return await response.json();
  } catch (error) {
      console.error("Error en obtenerDisponibilidad:", error);
      throw error;
  }
};

export const crearReserva = async (reserva) => {
  console.log(reserva.mesaId);
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
      body: JSON.stringify(reserva),
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const borrarReserva = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Si la API requiere un body en DELETE
    });

    if (!response.ok) {
      throw new Error("Error al borrar reserva");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Relanzamos el error para que `handleDelete` lo capture
  }
};


