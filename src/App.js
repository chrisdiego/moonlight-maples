import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppRouter from './AppRouter';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#78909c',
      light: '#a7c0cd',
      dark: '#4b636e',
    },
  },
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

export default App;


