import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
<Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" color="transparent">
    <Container>
      <Toolbar disableGutters>
        <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="inherit"
            component={Link}
            to="/"
            style={{ color: '#000000' }}
          >
            Lista de proveedores
          </Button>
          <Button
            variant="contained"
            color='inherit'
            component={Link}
            to="/lotes"
            style={{ color: '#000000' }}
          >
            Lotes vencidos
          </Button>
          <Button
            variant="contained"
            color='inherit'
            component={Link}
            to="/loteslistar"
            style={{ color: '#000000' }}
          >
            Listar los lotes
          </Button>
        </Typography>

<<<<<<< HEAD
        <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/lotes/edit')}
        >
          Nuevo lote
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/proveedor/edit')}
        >
          Nuevo proveedor
        </Button>
        </Typography>
=======
            <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/lotes/edit')}
            >
              Nuevo lote
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/proveedor/edit')}
            >
              Nuevo proveedor
            </Button>
            </Typography>
>>>>>>> 5ee5dde056e7e1c089a35f7a57d06ea15fcfd770

      </Toolbar>
    </Container>
  </AppBar>
</Box>
  );
}

export default Navbar;
