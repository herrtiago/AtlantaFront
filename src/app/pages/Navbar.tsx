import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../store/authStore';
import { useNavigate } from "react-router-dom"

export default function NavBar() {

  const navigate = useNavigate();
  const auth = useAuth(s => s.auth)

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mediafile
          </Typography>
          <Button color="inherit" onClick={()=>{
            localStorage.removeItem("token");
            auth()
            navigate("/")
          }}>Cerrar sesion</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
