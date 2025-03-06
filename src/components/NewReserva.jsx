import React, { useState, useEffect } from "react";
import { obtenerDisponibilidad } from "../services/restaurantServices";
import { crearReserva } from "../services/restaurantServices"; 

const NewReserva = () => {
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [mesasDisponibles, setMesasDisponibles] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    // Cargar disponibilidad al montar el componente
    useEffect(() => {
        const cargarDisponibilidad = async () => {
            try {
                const data = await obtenerDisponibilidad();
                console.log(data);
                setDisponibilidad(data);
            } catch (err) {
                setError("No se pudo obtener la disponibilidad. Intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };
        cargarDisponibilidad();
    }, []);

    // Manejar selección de fecha
    const handleFechaChange = (e) => {
        const fecha = e.target.value;
        setFechaSeleccionada(fecha);
        setHorarioSeleccionado("");
        setMesaSeleccionada("");

        // Buscar horarios disponibles para la fecha seleccionada
        const diaSeleccionado = disponibilidad.find(d => d.fecha === fecha);
        setHorariosDisponibles(diaSeleccionado ? diaSeleccionado.horarios : []);
    };

    // Manejar selección de horario
    const handleHorarioChange = (e) => {
        const hora = e.target.value;
        setHorarioSeleccionado(hora);
        setMesaSeleccionada("");

        // Buscar mesas disponibles para el horario seleccionado
        const horario = horariosDisponibles.find(h => h.hora === hora);
        setMesasDisponibles(horario ? horario.mesasDisponibles : []);
    };

    // Manejar selección de mesa
    const handleMesaChange = (e) => {
        setMesaSeleccionada(e.target.value);
    };

    // Enviar reserva
    const handleReservar = async () => {
        if (!fechaSeleccionada || !horarioSeleccionado || !mesaSeleccionada) {
            setError("Por favor, selecciona todos los datos.");
            return;
        }

        const reserva = {
            bookingDate: fechaSeleccionada,
            bookingTime: horarioSeleccionado,
            mesaId: mesaSeleccionada
        };

        try {
            await crearReserva(reserva);
            setReservaConfirmada(true);
            setError(null);
        } catch (err) {
            setError("No se pudo completar la reserva. Inténtalo de nuevo.");
        }
    };

    return (
        <div>
            <h2>Nueva Reserva</h2>

            {loading && <p>Cargando disponibilidad...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {reservaConfirmada && <p style={{ color: "green" }}>Reserva confirmada ✅</p>}

            {/* Selección de fecha */}
            <div>
                <label>Fecha:</label>
                <select value={fechaSeleccionada} onChange={handleFechaChange}>
                    <option value="">Selecciona una fecha</option>
                    {disponibilidad.map(d => (
                        <option key={d.fecha} value={d.fecha}>{d.fecha}</option>
                    ))}
                </select>
            </div>

            {/* Selección de horario (solo si ya se eligió una fecha) */}
            {fechaSeleccionada && (
                <div>
                    <label>Hora:</label>
                    <select value={horarioSeleccionado} onChange={handleHorarioChange}>
                        <option value="">Selecciona una hora</option>
                        {horariosDisponibles.map(h => (
                            <option key={h.hora} value={h.hora}>{h.hora}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Selección de mesa (solo si ya se eligió un horario) */}
            {horarioSeleccionado && (
                <div>
                    <label>Mesa:</label>
                    <select value={mesaSeleccionada} onChange={handleMesaChange}>
                        <option value="">Selecciona una mesa</option>
                        {mesasDisponibles.map(m => (
                            <option key={m.id} value={m.id}>{m.number}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Botón de reserva */}
            {mesaSeleccionada && (
                <div>
                    <button onClick={handleReservar}>Reservar</button>
                </div>
            )}
        </div>
    );
};

export default NewReserva;
