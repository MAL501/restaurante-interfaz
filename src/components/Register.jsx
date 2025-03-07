import { useState } from 'react';
import { register } from '../services/restaurantServices';

export default function Register() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [passwd2, setPasswd2] = useState('');

    const handleRegister = () => {
        register(user, email, passwd,passwd2); 
    };

    return (
        <div>
            <h1>Registrarse</h1>
            Nombre del usuario: <input 
                        type="text" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                    /><br />
            Email del usuario: <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            /><br />
            Contraseña: <input 
                            type="password" 
                            value={passwd} 
                            onChange={(e) => setPasswd(e.target.value)} 
                        /><br />

            Repita contraseña: <input 
                            type="password" 
                            value={passwd2} 
                            onChange={(e) => setPasswd2(e.target.value)} 
                        /><br />
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
}
