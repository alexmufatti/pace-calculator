import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { resize } from './actions/appActions';
import Welcome from './components/Main';
import { CssBaseline } from '@material-ui/core';
import * as React from "react";
import { update } from './actions/paceActions';
import {indigo, lightBlue} from "@material-ui/core/colors";



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
    time,
    pace,
    update
}

class App extends React.Component<IProps, {}> {

  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.changeCallback = this.changeCallback.bind(this);
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

  render() {

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Welcome calcType={this.props.calcType} distance={this.props.distance} time={this.props.time} pace={this.props.pace}
          onChange={this.changeCallback}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    size: state.app.size,
    isMobile: state.app.isMobile,
      calcType: state.blog.calcType,
      time: state.blog.time,
      distance: state.blog.distance,
      pace: state.blog.pace
  }
}

export default connect(mapStateToProps, { resize, update })(App);
