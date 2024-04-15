import './App.css';
import Main from "./components/Main";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Main />
      </LocalizationProvider>
  );
}

export default App;
