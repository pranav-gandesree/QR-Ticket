// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import TicketForm from './TicketForm';
// import { Container, Typography, CssBaseline, AppBar, Toolbar, IconButton, Switch as MuiSwitch } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';

// import QRCodeDisplay from './qrcode';

// // Custom dark mode theme
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// // Custom light mode theme
// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// function App() {
//   const [darkMode, setDarkMode] = useState(true);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const currentTheme = darkMode ? darkTheme : lightTheme;

//   return (
//     <ThemeProvider theme={currentTheme}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
//          Book Tickets
//         </Typography>

//           <IconButton onClick={toggleDarkMode} color="inherit">
//             {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="sm" style={{ marginTop: '20px' }}>
//         <TicketForm />
//         {/* <QRCodeDisplay/> */}
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketForm from './TicketForm';
import { Container, Typography, CssBaseline, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import QRCodeDisplay from './qrcode';

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
          <Routes>
            <Route path="/" element={<TicketForm />} />
            <Route path="/qrcode" element={<QRCodeDisplay />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

