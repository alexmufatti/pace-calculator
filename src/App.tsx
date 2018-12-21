import {connect} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {resize} from './actions/appActions';
import Main from './components/Main';
import {CssBaseline} from '@material-ui/core';
import * as React from "react";
import {update} from './actions/paceActions';
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

interface IProps {
    isMobile: boolean,
    resize,
    calcType,
    distance,
    distanceError,
    time,
    timeError,
    pace,
    paceError,
    update,
    marathontime,
    halfmarathontime,
    tenktime
}

interface IState {
    selectedTab: number
}

class App extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);
        this.changeCallback = this.changeCallback.bind(this);
        this.state = { selectedTab: 0 };
    }

    resize() {
        this.props.resize(window.innerWidth);
    }

    componentWillMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    changeCallback(event) {
        this.props.update(event.target.name, event.target.value);
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };

    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Main calcType={this.props.calcType} distance={this.props.distance} time={this.props.time} pace={this.props.pace} paceError={this.props.paceError}
                                                           timeError={this.props.timeError} distanceError={this.props.distanceError} onChange={this.changeCallback}
                          marathontime={this.props.marathontime} tenktime={this.props.tenktime} halfmarathontime={this.props.halfmarathontime} />}
                    </MuiThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        size: state.app.size,
        isMobile: state.app.isMobile,
        calcType: state.pace.calcType,
        time: state.pace.time,
        timeError: state.pace.timeError,
        distance: state.pace.distance,
        distanceError: state.pace.distanceError,
        pace: state.pace.pace,
        paceError: state.pace.paceError,
        tenktime: state.pace.tenktime,
        marathontime: state.pace.marathontime,
        halfmarathontime: state.pace.halfmarathontime
    }
}

export default connect(mapStateToProps, {resize, update})(App);
