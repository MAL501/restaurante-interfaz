import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import './App.css';
import TablaReservas from "./components/TablaReservas";
import Login from "./components/Login";
import Register from "./components/Register";
import { obtenerReservas } from "./services/restaurantServices";

function App() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await obtenerReservas();
      console.log(data);
      setReservas(data);
    }
    fetchData();
  }, []);

  const logout = () =>{
    localStorage.setItem("token","")
  }
  return (
    <BrowserRouter>
      <div className="App flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <header className="App-header w-full max-w-4xl">
          <nav>
            <Link to="/">Login</Link> | 
            <Link to="/register">Registro</Link> | 
            <Link >Logout</Link> | 
            <Link to="/table">Reservas</Link>
          </nav>
        </header>

        <Routes>  
          {/* Este Routes es una especie de "Switch" el cuál nos manda a todas las rutas que necesitemos */}
          <Route path="/register" element={<Register />} />
          <Route path="/table" element={<TablaReservas reservas={reservas} />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
