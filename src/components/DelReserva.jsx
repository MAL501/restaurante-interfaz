import { useLocation, useNavigate } from "react-router-dom";
import { borrarReserva } from '../services/restaurantServices';
import { useState } from "react";

export default function DelReserva() {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const reserva = location.state?.reserva;

  const handleDelete =async () =>{
    try{
      await borrarReserva(reserva.id);
      setError(null);
    }catch{
      setError("No le pertenece la reserva o hubo un error en el servidor");
    }
  }

  if (!reserva) {
    return <p>No se encontró la reserva.</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">¿Está seguro de que quiere eliminar esta reserva?</h1>
      <ul className="mb-4">
        <li className="px-4 py-3"><strong>Nombre:</strong> {reserva.nombre}</li>
        <li className="px-4 py-3"><strong>Email:</strong> {reserva.email}</li>
        <li className="px-4 py-3 font-semibold text-green-600"><strong>Fecha:</strong> {reserva.fecha}</li>
        <li className="px-4 py-3"><strong>Número de mesa:</strong> {reserva.numero_mesa}</li>
      </ul>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Eliminar</button>
      <button
        className="bg-gray-300 text-black px-4 py-2 rounded"
        onClick={() => navigate("/table")}
      >
        Cancelar
      </button>
    </div>
  );
}
