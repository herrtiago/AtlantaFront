import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../assets/css/home.css";
import "../../../assets/css/login.css";
import LogoImg from '../../../assets/images/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await fetch('http://localhost:5121/login/test');
      const message = await response.text();
      console.log(message); // Imprime la respuesta en la consola
      navigate('/files');
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  return (
    <div className="flex min-h-screen text-center">
      {/* Contenedor izquierda */}
      <div className="w-1/2 gris flex justify-center items-center">
        <img src={LogoImg} alt="Logo App" className="max-w-xs" />
      </div>
      {/* Contenedor principal*/}
      <div className="w-1/2 bg-[#60a5fa] flex flex-col justify-center items-center p-12">
        {/* Titulos*/}
        <div className="mb-16">
          <h1 className="text-9xl font-hand">Atlanta</h1>
          <p className="text-3xl font-hand">GESTIONA TUS ARCHIVOS</p>
        </div>
        {/* Inputs Login*/}
        <input
          type="text"
          placeholder="Correo electrónico"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login boton */}
        <button
          className="button bg-[#7e22ce] mb-4"
          onClick={handleLoginClick}
        >
          INICIAR SESIÓN
        </button>
        {/* Link a Registro */}
        <div>
          <span className="text-white mr-2">No tienes una cuenta?</span>
          <a href="/register" className="text-[#7e22ce] font-hand underline">REGISTRATE</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
