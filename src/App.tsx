import React from 'react';
import AppRouter from "./components/router/AppRouter";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

function App() {

  return (
      <ThemeProvider theme={theme}>
        <AppRouter/>
      </ThemeProvider>
  );
}

export default App;
