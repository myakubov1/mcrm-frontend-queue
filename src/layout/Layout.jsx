import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

function Layout() {
  return (
    <Container sx={{ py: 0 }}>
      <Outlet />
    </Container>

  );
}

export default Layout;
