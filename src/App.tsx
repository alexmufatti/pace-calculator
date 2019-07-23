import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Main from './components/Main';
import {CssBaseline} from '@material-ui/core';
import React from "react";
import {indigo, lightBlue} from "@material-ui/core/colors";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-21196458-2');
ReactGA.pageview('/');
ReactGA.pageview(window.location.pathname + window.location.search);

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: lightBlue,
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedTab: 0 };
    }

    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Main />}
                    </MuiThemeProvider>
            </div>
        )
    }
}

export default App;
