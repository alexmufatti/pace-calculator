import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(55, 48, 163)',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },

    typography: {
        fontFamily: 'Roboto',
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 12,
    },
});

export default theme;
