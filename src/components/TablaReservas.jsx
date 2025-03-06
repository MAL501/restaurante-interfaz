import NewReserva from "./NewReserva";

export default function ProjectTable({ reservas}) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <h1>Reservas</h1>
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead className="bg-blue-600 text-white text-left">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">email</th>
            <th className="px-4 py-3">Fecha Reserva</th>
            <th className="px-4 py-3">Número de mesa</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservas.map((reserva) => (
            <tr className="odd:bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-3">{reserva.nombre}</td>
              <td className="px-4 py-3">{reserva.email}</td>
              <td className="px-4 py-3 font-semibold text-green-600">{reserva.fecha}</td>
              <td className="px-4 py-3">{reserva.numero_mesa}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewReserva></NewReserva>
    </div>
  );
}