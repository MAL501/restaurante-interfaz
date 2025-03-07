import { useState } from 'react';
import { useNavigate } from "react-router-dom";  
import { login } from '../services/restaurantServices';

export default function Login({setToken}) {
    const [user, setUser] = useState('');
    const [passwd, setPasswd] = useState('');
    const navigate = useNavigate();  

    const handleLogin = async () => {
        const success = await login(user, passwd);  
        if (success) {
            navigate('/table'); 
            setToken(success); 
        } else {
            alert("Usuario o contraseña incorrectos");  
        }
    };

    return (
        <div>
            <h1>Login para las reservas</h1>
            Usuario: <input 
                        type="text" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                    /><br />
            Contraseña: <input 
                            type="password" 
                            value={passwd} 
                            onChange={(e) => setPasswd(e.target.value)} 
                        /><br />
            <button onClick={handleLogin}>Iniciar sesión</button> 
        </div>
    );
}
