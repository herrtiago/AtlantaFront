import "../../../assets/css/home.css"

import LogoImg from '../../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex min-h-screen text-center">
            {/* Contenedor izquierda */}
            <div className="w-1/2 gris flex justify-center items-center">
                <img src={LogoImg} alt="Logo App" className="max-w-xs" />
            </div>
            {/* Contenedor principal*/}
            <div className="w-1/2 bg-[#60a5fa] flex flex-col justify-center items-center p-12">
                {/* Titulos*/}
                <div className="mb-auto">
                    <h1 className="text-9xl font-hand">Atlanta</h1>
                    <p className="text-3xl font-hand">GESTIONA TUS ARCHIVOS</p>
                </div>
                {/* Botones */}
                <div className="mt-auto mb-12">
                    <Link to="/login">
                        <button className="button bg-[#7e22ce] mb-4">INICIAR SESIÓN</button>
                    </Link>
                    <Link to="/register">
                        <button className="button bg-[#312e81]">REGISTRARSE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;