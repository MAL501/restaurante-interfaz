import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import './App.css';
import TablaReservas from "./components/TablaReservas";
import Login from "./components/Login";
import Register from "./components/Register";
import DelReserva from './components/DelReserva';
import { obtenerReservas } from "./services/restaurantServices";

function App() {
  const [reservas, setReservas] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [disponibilidad, setDisponibilidad] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await obtenerReservas();
      console.log(data);
      setReservas(data);
    }
    fetchData();
  }, [token]);

  const logout = () =>{
    localStorage.setItem("token","");
    setReservas([]);
    setDisponibilidad([]);
  }
  /**
   * ActualizarTabla se llamará en todas las funciones que actualicen la tabla
   * y con el useEffect permitirá que se actualice la variable reservas, recargando
   * los componentes dónde se use
   */
  return (
    <BrowserRouter>
      <div className="App flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <header className="App-header w-full max-w-4xl">
          <nav>
            <Link to="/">Login</Link> | 
            <Link to="/register">Registro</Link> | 
            <Link to="/" onClick={logout}>Logout</Link> | 
            <Link to="/table">Reservas</Link>
          </nav>
        </header>

        <Routes>  
          {/* Este Routes es una especie de "Switch" el cuál nos manda a todas las rutas que necesitemos */}
          <Route path="/register" element={<Register />} />
          <Route path="/table" element={<TablaReservas reservas={reservas} token={token} setToken={setToken} disponibilidad={disponibilidad} setDisponibilidad={setDisponibilidad}/>} />
          <Route path="/eliminar/:id" element={<DelReserva reservas={reservas} setReservas={setReservas} />} />
          <Route path="/" element={<Login setToken={setToken}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
