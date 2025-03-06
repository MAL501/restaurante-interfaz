import React, { useState, useEffect } from "react";
import { obtenerDisponibilidad, crearReserva } from "../services/restaurantServices"; 

const NewReserva = () => {
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [mesasDisponibles, setMesasDisponibles] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState("");
    const [personas, setPersonas] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    useEffect(() => {
        const cargarDisponibilidad = async () => {
            try {
                const data = await obtenerDisponibilidad();
                setDisponibilidad(data);
            } catch (err) {
                setError("No se pudo obtener la disponibilidad. Intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };
        cargarDisponibilidad();
    }, []);

    const handleFechaChange = (e) => {
        setFechaSeleccionada(e.target.value);
        setHorarioSeleccionado("");
        setMesaSeleccionada("");
        const diaSeleccionado = disponibilidad.find(d => d.fecha === e.target.value);
        setHorariosDisponibles(diaSeleccionado ? diaSeleccionado.horarios : []);
    };

    const handleHorarioChange = (e) => {
        setHorarioSeleccionado(e.target.value);
        setMesaSeleccionada("");
        const horario = horariosDisponibles.find(h => h.hora === e.target.value);
        setMesasDisponibles(horario ? horario.mesasDisponibles : []);
    };

    const handleMesaChange = (e) => {
        setMesaSeleccionada(e.target.value);
    };

    const handlePersonasChange = (e) => {
        const numPersonas = parseInt(e.target.value, 10);
        setPersonas(numPersonas > 0 ? numPersonas : 1);
    };

    const handleReservar = async () => {
        if (!fechaSeleccionada || !horarioSeleccionado || !mesaSeleccionada) {
            setError("Por favor, selecciona todos los datos.");
            return;
        }

        const reserva = {
            bookingDate: fechaSeleccionada,
            bookingTime: horarioSeleccionado,
            mesaId: mesaSeleccionada,
            people: personas
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

            <div>
                <label>Fecha:</label>
                <select value={fechaSeleccionada} onChange={handleFechaChange}>
                    <option value="">Selecciona una fecha</option>
                    {disponibilidad.map(d => (
                        <option key={d.fecha} value={d.fecha}>{d.fecha}</option>
                    ))}
                </select>
            </div>

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

            {mesaSeleccionada && (
                <div>
                    <label>Número de personas:</label>
                    <input type="number" min="1" value={personas} onChange={handlePersonasChange} />
                </div>
            )}

            {mesaSeleccionada && (
                <div>
                    <button onClick={handleReservar}>Reservar</button>
                </div>
            )}
        </div>
    );
};

export default NewReserva;
