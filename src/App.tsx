import React from 'react';
import './App.css';
import {CssBaseline} from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import Main from "./components/Main";

function App() {
  return (
      <StyledEngineProvider>
          <CssBaseline/>
          <Main />
      </StyledEngineProvider>
  );
}

export default App;
