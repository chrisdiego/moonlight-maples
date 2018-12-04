import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import AppRouter from './AppRouter';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#618cb9',
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


