import NewReserva from "./NewReserva";
import { useNavigate } from "react-router-dom";

export default function ProjectTable({ reservas, token, setToken, disponibilidad, setDisponibilidad }) {
  const navigate = useNavigate();


  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <h1>Reservas</h1>
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead className="bg-blue-600 text-white text-left">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Fecha Reserva</th>
            <th className="px-4 py-3">Número de mesa</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservas.map((reserva) => (
            <tr key={reserva.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-3">{reserva.nombre}</td>
              <td className="px-4 py-3">{reserva.email}</td>
              <td className="px-4 py-3 font-semibold text-green-600">{reserva.fecha}</td>
              <td className="px-4 py-3">{reserva.numero_mesa}</td>
              <td>
                <button
                    onClick={() => navigate(`/eliminar/${reserva.id}`, { state: { reserva } })}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewReserva token={token} setToken={setToken} disponibilidad={disponibilidad} setDisponibilidad={setDisponibilidad}/>
    </div>
  );
}
