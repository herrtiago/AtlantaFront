import "../../../assets/css/home.css";
import LogoImg from '../../../assets/images/logo.jpg';
const Register = () => {
  return (
    <div className="flex min-h-screen text-center">
      {/* Contenedor izquierda */}
      <div className="w-1/2 gris flex justify-center items-center">
        <img src={LogoImg} alt="Logo App" className="max-w-xs" />
      </div>
      {/* Contenedor principal*/}
      <div className="w-1/2 bg-[#60a5fa] flex flex-col justify-center items-center p-12">
        {/* Titulos*/}
        <div className="mb-10">
          <h1 className="text-9xl font-hand">Atlanta</h1>
          <p className="text-3xl font-hand">GESTIONA TUS ARCHIVOS</p>
        </div>
        {/* Inputs Registro*/}
        <input type="text" placeholder="Usuario" className="login-input" />
        <input type="email" placeholder="Correo electrónico" className="login-input" />
        <input type="password" placeholder="Contraseña" className="login-input" />
        <input type="password" placeholder="Confirmar contraseña" className="login-input" />
        {/* Boton */}
        <button className="button bg-[#312e81]">REGISTRARSE</button>
      </div>
    </div>
  );
};

export default Register;
