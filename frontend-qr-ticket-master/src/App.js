import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketForm from './TicketForm';
import { Container, Typography, CssBaseline, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import Success from './Success'
import Cancel from './Cancel'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Custom dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Custom light mode theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


const stripePromise = loadStripe(process.env.REACT_APP_KEY);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
      
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Book Tickets
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/"  element={<TicketForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Elements>
        </Container>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
