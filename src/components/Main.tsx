import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import * as React from "react";
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
  laps: { key: string; time: string }[];
  calcType: string;
  time: string;
  timeError: boolean;
  distance: string;
  distanceError: boolean;
  pace: string;
  paceError: boolean;
  tenktime: string;
  halfmarathontime: string;
  marathontime: string;
  showLaps: boolean;
}

class Main extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      laps: [],
      calcType: "0",
      time: "",
      distance: "0",
      distanceError: false,
      halfmarathontime: "",
      marathontime: "",
      pace: "",
      paceError: false,
      tenktime: "",
      timeError: false,
      showLaps: false
    };
  }

  render() {
    console.log("render...");
    const { classes } = this.props;
    const data = this.calc();
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
                    primary={data.tenktime}
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
                    primary={data.halfmarathontime}
                    className={classes.listItem}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">Marathon</Typography>}
                  />
                  <ListItemText
                    primary={data.marathontime}
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
                {data.laps.map((lap, i) => {
                  return (
                    <ListItem key={lap.key}>
                      <ListItemText primary={lap.time} secondary={lap.key} />
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
    let data = {
      ...this.state,
      laps: []
    };

    data[event.target.name] = event.target.value;

    this.setState({
      ...this.state,
      laps: data.laps,
      time: data.time,
      distance: data.distance,
      pace: data.pace,
      timeError: data.timeError,
      distanceError: data.distanceError,
      paceError: data.paceError,
      calcType: data.calcType,
      tenktime: data.tenktime,
      halfmarathontime: data.halfmarathontime,
      marathontime: data.marathontime,
      showLaps: data.showLaps
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

  calcLaps = (
    distance: string,
    pace: string
  ): { key: string; time: string }[] => {
    const distanceF = parseFloat(this.state.distance);
    const laps = [...Array(Math.floor(distanceF)).keys()].map((v, idx) => {
      const left = distanceF - (idx + 1) >= 1 ? idx + 1 : distanceF;
      return {
        key: "Km " + left,
        time: timeUtils.createTimeString(
          timeUtils.getTime(left * timeUtils.getTotalSeconds(pace))
        )
      };
    });

    return laps;
  };

  calc = () => {
    let data = { ...this.state };
    switch (data.calcType) {
      case "PACE":
        console.log("calc pace...");
        data.pace = "";
        data.distanceError = !this.validateDistance(data.distance);
        data.timeError = !this.validateTime(data.time);
        if (data.distanceError || data.timeError) break;
        let totSec = timeUtils.getTotalSeconds(data.time.toString());
        var pace = totSec / parseFloat(data.distance); //s/km
        pace = isNaN(pace) ? 0 : pace;
        data.pace = timeUtils.createPaceString(timeUtils.getTime(pace));
        break;
      case "DISTANCE":
        console.log("calc distance...");
        data.distance = "";
        data.timeError = !this.validateTime(data.time);
        data.paceError = !this.validatePace(data.pace);
        if (data.paceError || data.timeError) break;
        var totalSec = timeUtils.getTotalSeconds(data.time);

        var totalSecPace = timeUtils.getTotalSeconds(data.pace);

        let distance = totalSec / totalSecPace;

        data.distance = isNaN(distance) ? "0" : distance.toFixed(3);
        break;
      case "TIME":
        console.log("calc time...");
        data.time = "0";
        data.distanceError = !this.validateDistance(data.distance);
        data.paceError = !this.validatePace(data.pace);
        if (data.paceError || data.distanceError) break;
        var totalDistance = parseFloat(data.distance); //km
        totalDistance = isNaN(totalDistance) ? 0 : totalDistance;
        var totalSecPace = timeUtils.getTotalSeconds(data.pace);

        var time = totalDistance * totalSecPace;

        data.time = timeUtils.createTimeString(timeUtils.getTime(time));
        break;
    }
    data.tenktime = "0";
    data.halfmarathontime = "0";
    data.marathontime = "0";

    data.tenktime = timeUtils.createTimeString(
      timeUtils.getTime(
        timeUtils.getTotalSeconds(data.time) *
          Math.pow(10 / parseFloat(data.distance), 1.06)
      )
    );
    data.halfmarathontime = timeUtils.createTimeString(
      timeUtils.getTime(
        timeUtils.getTotalSeconds(data.time) *
          Math.pow(21.0975 / parseFloat(data.distance), 1.06)
      )
    );
    data.marathontime = timeUtils.createTimeString(
      timeUtils.getTime(
        timeUtils.getTotalSeconds(data.time) *
          Math.pow(42.195 / parseFloat(data.distance), 1.06)
      )
    );
    if (data.showLaps) {
      console.log("calculate laps");
      data.laps = this.calcLaps(data.distance, data.pace);
    }
    console.log(data);
    return {
      ...data
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
