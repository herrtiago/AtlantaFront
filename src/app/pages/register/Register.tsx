import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../assets/css/home.css";
import "../../../assets/css/login.css";
import LogoImg from '../../../assets/images/logo.jpg';
import { UserService } from '../../../services/UserService';
import * as alertifyjs from "alertifyjs";
import { Delay } from '../../../utils/delay';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      alertifyjs.error("Las contraseñas no coinciden");
      return;
    }

    UserService.Register(email, fullname, password)
      .then(async (res) => {
        if (res.success && res.data) {
          alertifyjs.success("Registro exitoso");

          await Delay(500);

          localStorage.setItem("token", res.data);
          navigate("/files");
        } else {
          alertifyjs.error(res.errors.join(", "));
        }
        window.location.reload();
      });
  };

  return (
    <div className="flex min-h-screen text-center">
      {/* Contenedor izquierda */}
      <div className="w-1/2 gris flex justify-center items-center">
        <img src={LogoImg} alt="Logo App" className="max-w-xs" />
      </div>
      {/* Contenedor principal */}
      <div className="w-1/2 bg-[#60a5fa] flex flex-col justify-center items-center p-12">
        {/* Titulos */}
        <div className="mb-10">
          <h1 className="text-9xl font-hand">Atlanta</h1>
          <p className="text-3xl font-hand">GESTIONA TUS ARCHIVOS</p>
        </div>
        {/* Inputs Registro */}
        <input
          type="text"
          placeholder="Nombre completo"
          className="login-input"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
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
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="login-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* Boton */}
        <button
          className="button bg-[#312e81]"
          onClick={handleRegisterClick}
        >
          REGISTRARSE
        </button>
      </div>
    </div>
  );
};

export default Register;
