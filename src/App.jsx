import React from 'react';
import Home from './pages/Home';
import Container from '@mui/material/Container';

const App = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Home />
    </Container>
  );
};

export default App;
