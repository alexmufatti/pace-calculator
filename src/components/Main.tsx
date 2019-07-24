import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import React from "react";
import { TextField } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import timeUtils from "../timeUtils";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Laps from "../Models/Lap";
import PredictedTimes from "../Models/PredictedTimes";
import Time from "../Models/Time";
import TimeCalculator from "../Models/TimeCalulator";

const styles = theme =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      textAlign: "center"
    },
    field: {
      margin: theme.spacing.unit * 3
    },
    button: {
      margin: theme.spacing.unit
    },
    group: {
      flexDirection: "row",
      margin: `${theme.spacing.unit}px 0`,
      "justify-content": "center"
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    listItem: {
      textAlign: "right"
    },
    listItemKm: {
      fontWeight: "bold"
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  laps: Array<Laps>;
  calcType: string;
  time: string;
  timeError: boolean;
  distance: string;
  distanceError: boolean;
  pace: string;
  paceError: boolean;
  predictedTimes: PredictedTimes;
  showLaps: boolean;
}

class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      laps: new Array<Laps>(),
      calcType: "PACE",
      time: "50:00",
      distance: "10",
      distanceError: false,
      predictedTimes: new PredictedTimes("0", "0"),
      pace: "",
      paceError: false,
      timeError: false,
      showLaps: false
    };
  }

  render() {
    console.log("render...");
    const { classes } = this.props;
    const data: any = this.calc();
    return (
      <div>
        <main className={classes.content}>
          <h1>Pace calculator</h1>
          <Grid
            container
            spacing={24}
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Paper className={classes.paper}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                aria-label="Type"
                name="calcType"
                className={classes.group}
                value={data.calcType}
                onChange={this.onChange}
              >
                <FormControlLabel
                  value="PACE"
                  control={<Radio />}
                  label="Pace"
                />
                <FormControlLabel
                  value="TIME"
                  control={<Radio />}
                  label="Time"
                />
                <FormControlLabel
                  value="DISTANCE"
                  control={<Radio />}
                  label="Distance"
                />
              </RadioGroup>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <TextField
                    variant="outlined"
                    error={data.timeError}
                    disabled={data.calcType == "TIME"}
                    name="time"
                    label="Time (HH:MM:SS)"
                    className={classes.field}
                    value={data.time}
                    onChange={this.onChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <TextField
                      variant="outlined"
                      error={data.distanceError}
                      disabled={data.calcType == "DISTANCE"}
                      name="distance"
                      label="Distance (Km)"
                      className={classes.field}
                      value={data.distance}
                      onChange={this.onChange}
                      margin="normal"
                    />

                    <Button
                      onClick={this.click10}
                      size="small"
                      variant="outlined"
                      className={classes.button}
                    >
                      10k
                    </Button>
                    <Button
                      onClick={this.clickHM}
                      size="small"
                      variant="outlined"
                      className={classes.button}
                    >
                      Half Marathon
                    </Button>
                    <Button
                      onClick={this.clickM}
                      size="small"
                      variant="outlined"
                      className={classes.button}
                    >
                      Marathon
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    error={data.paceError}
                    disabled={data.calcType == "PACE"}
                    name="pace"
                    label="Pace (MM:SS)"
                    className={classes.field}
                    value={data.pace}
                    onChange={this.onChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <FormLabel>Pace Prediction</FormLabel>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">10 Km</Typography>}
                  />
                  <ListItemText
                    primary={data.predictedTimes.tenTime.timeString()}
                    className={classes.listItem}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6">Half marathon</Typography>
                    }
                  />
                  <ListItemText
                    primary={data.predictedTimes.halfMarathonTime.timeString()}
                    className={classes.listItem}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">Marathon</Typography>}
                  />
                  <ListItemText
                    primary={data.predictedTimes.marathonTime.timeString()}
                    className={classes.listItem}
                  />
                </ListItem>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <FormLabel>Laps</FormLabel>
                <Button
                  onClick={this.showLaps}
                  size="small"
                  variant="outlined"
                  className={classes.button}
                >
                  Calculate Laps
                </Button>
              </Grid>
              <Grid item>
                {data.laps.map(lap => {
                  return (
                    <ListItem key={lap.key}>
                      <ListItemText
                        primary={lap.time.timeString()}
                        secondary={lap.key}
                      />
                    </ListItem>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        </main>
      </div>
    );
  }

  onChange = event => {
    let data: State = {
      ...this.state,
      laps: new Array<Laps>()
    };

    data[event.target.name] = event.target.value;

    this.setState({
      ...this.state,
      ...data
    });
  };

  click10 = () => {
    this.onChange({ target: { name: "distance", value: "10" } });
  };

  clickHM = () => {
    this.onChange({ target: { name: "distance", value: "21.0975" } });
  };

  clickM = () => {
    this.onChange({ target: { name: "distance", value: "42.195" } });
  };

  showLaps = () => {
    const laps = !this.state.showLaps;
    this.onChange({ target: { name: "showLaps", value: laps } });
  };

  calcLaps = (distance: string, pace: string): Array<Laps> => {
    const distanceF = parseFloat(this.state.distance);
    const laps = [...Array(Math.floor(distanceF)).keys()].map((v, idx) => {
      return new Laps(idx, pace, distanceF);
    });

    return laps;
  };

  calc = () => {
    let calculator = new TimeCalculator(
      this.state.calcType,
      this.state.time,
      this.state.distance,
      this.state.pace
    );

    let predictedTimes = new PredictedTimes(
      calculator.time,
      calculator.distance
    );
    let laps = Array<Laps>();
    if (this.state.showLaps) {
      console.log("calculate laps");
      laps = this.calcLaps(calculator.distance, calculator.pace);
    }
    return {
      ...calculator,
      laps,
      predictedTimes
    };
  };

  validateDistance = function(distance: string): boolean {
    return timeUtils.validateDistance(distance);
  };

  validatePace = function(pace: string): boolean {
    return timeUtils.validatePace(pace);
  };

  validateTime = function(time: string): boolean {
    return timeUtils.validateTime(time);
  };
}

export default withStyles(styles, { withTheme: true })(Main);
