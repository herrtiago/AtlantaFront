import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../../assets/css/home.css";
import FilesView from './files/Files';
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/files" element={<FilesView/>} />
      </Routes>
    </Router>
  );
}

export default App;