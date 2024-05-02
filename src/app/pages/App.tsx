import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../../assets/css/home.css";
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import { useAuth } from '../../store/authStore';
import { useEffect } from 'react';
import { FilesView } from './files/Files';

function App() {

  const auth = useAuth(s => s.auth);

  useEffect(() => {
    auth();
  },[auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/files" element={<FilesView/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
