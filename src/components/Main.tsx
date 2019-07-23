import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles';
import * as React from "react";
import {TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import timeUtils from '../timeUtils'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        textAlign: 'center',
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
        'justify-content': "center"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    listItem: {
        textAlign: 'right',
    },
    listItemKm: {
        fontWeight: 'bold',
    },
});


interface Props extends WithStyles<typeof styles> {

}

interface State {
    laps: Array<any>,
    calcType: string,
    time: string,
    timeError: boolean,
    distance: string,
    distanceError: boolean,
    pace: string,
    paceError: boolean,
    tenktime: string,
    halfmarathontime: string,
    marathontime: string
}

class Main extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {laps: [], calcType: "0", time: '',distance: "0", distanceError: false, halfmarathontime: "", marathontime: "", pace: "", paceError: false, tenktime: "", timeError: false };
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.content}>
                    <h1>Pace calculator</h1>
                    <Grid container spacing={24} justify="center" direction="column" alignItems="center">
                        <Paper className={classes.paper}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup aria-label="Type" name="calcType" className={classes.group} value={this.state.calcType} onChange={this.onChange}>
                                <FormControlLabel value="PACE" control={<Radio/>} label="Pace"/>
                                <FormControlLabel value="TIME" control={<Radio/>} label="Time"/>
                                <FormControlLabel value="DISTANCE" control={<Radio/>} label="Distance"/>
                            </RadioGroup>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="center">
                                <Grid item>
                                    <TextField variant="outlined" error={this.state.timeError} disabled={this.state.calcType == 'TIME'} name="time" label="Time (HH:MM:SS)"
                                               className={classes.field} value={this.state.time} onChange={this.onChange} margin="normal"/>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column">
                                        <TextField variant="outlined" error={this.state.distanceError} disabled={this.state.calcType == 'DISTANCE'} name="distance"
                                                   label="Distance (Km)" className={classes.field} value={this.state.distance} onChange={this.onChange} margin="normal"/>

                                        <Button onClick={this.click10} size="small" variant="outlined" className={classes.button}>
                                            10k
                                        </Button>
                                        <Button onClick={this.clickHM} size="small" variant="outlined" className={classes.button}>
                                            Half Marathon
                                        </Button>
                                        <Button onClick={this.clickM} size="small" variant="outlined" className={classes.button}>
                                            Marathon
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField variant="outlined" error={this.state.paceError} disabled={this.state.calcType == 'PACE'} name="pace" label="Pace (MM:SS)"
                                               className={classes.field} value={this.state.pace} onChange={this.onChange} margin="normal"/>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid item container direction="column" justify="center" alignItems="center">
                                <FormLabel>Pace Prediction</FormLabel>
                                <ListItem >
                                    <ListItemText primary={<Typography variant="h6">10 Km</Typography>} />
                                    <ListItemText primary={this.state.tenktime} className={classes.listItem} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={<Typography variant="h6">Half marathon</Typography>} />
                                    <ListItemText primary={this.state.halfmarathontime} className={classes.listItem} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={<Typography variant="h6">Marathon</Typography>} />
                                    <ListItemText primary={this.state.marathontime} className={classes.listItem} />
                                </ListItem>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid item container direction="column" justify="center" alignItems="center">
                                <FormLabel>Laps</FormLabel>
                                <Button onClick={this.calcLaps} size="small" variant="outlined" className={classes.button}>
                                    Calculate Laps
                                </Button>
                            </Grid>
                            <Grid item>
                                {this.state.laps.map((lap, i) => {
                                    return (<ListItem key={lap.key}>
                                        <ListItemText primary={lap.time} secondary={lap.key}/></ListItem>)
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                </main>
            </div>
        );
    }

    onChange = (event) => {
        this.calc({ field: event.target.name, value: event.target.value});
    }

    click10 = () => {
        this.onChange({target: {name: "distance", value: "10"}});
    }

    clickHM = () => {
        this.onChange({target: {name: "distance", value: "21.0975"}});
    }

    clickM = () => {
        this.onChange({target: {name: "distance", value: "42.195"}});
    }

    calcLaps = () => {
        const distance = parseFloat(this.state.distance);
        const laps = [...Array(Math.floor(distance)).keys()].map((v,idx)=> {
            const left = (distance - (idx+1) >= 1) ? idx+1 : distance;
            return {key: 'Km ' + left, time: timeUtils.createTimeString(timeUtils.getTime(left * timeUtils.getTotalSeconds(this.state.pace)))}})

        this.setState((state) => {
            return {...state, laps: laps}
        });
    }

    calc = (action) => {
        let data = { time: this.state.time,
            distance: this.state.distance,
            pace: this.state.pace,
            calcType: this.state.calcType,
            timeError: false,
            distanceError: false,
            paceError: false};

            data[action.field] = action.value;
            switch (data.calcType) {
                case "PACE":
                    data.pace = "";
                    data.distanceError = !this.validateDistance(data.distance);
                    data.timeError = !this.validateTime(data.time);
                    if (data.distanceError || data.timeError) break;
                    let totSec = timeUtils.getTotalSeconds(data.time.toString());
                    var pace = totSec / parseFloat(data.distance); //s/km
                    pace = isNaN(pace)?0:pace;
                    data.pace = timeUtils.createPaceString(timeUtils.getTime(pace));
                    break;
                case "DISTANCE":
                    data.distance = "";
                    data.timeError = !this.validateTime(data.time);
                    data.paceError = !this.validatePace(data.pace);
                    if (data.paceError || data.timeError) break;
                    var totalSec = timeUtils.getTotalSeconds(data.time);

                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    let distance = (totalSec / totalSecPace);

                    data.distance = isNaN(distance)?"0":distance.toFixed(3);
                    break;
                case "TIME":
                    data.time = "0";
                    data.distanceError = !this.validateDistance(data.distance);
                    data.paceError = !this.validatePace(data.pace);
                    if (data.paceError || data.distanceError) break;
                    var totalDistance = parseFloat(data.distance); //km
                    totalDistance = isNaN(totalDistance)?0:totalDistance;
                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    var time = totalDistance * totalSecPace;

                    data.time = timeUtils.createTimeString(timeUtils.getTime(time));
                    break;
            }
            let tenktime = '0';
            let halfmarathontime = '0';
            let marathontime = '0';

            tenktime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(10/parseFloat(data.distance),1.06)));
            halfmarathontime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(21.0975/parseFloat(data.distance),1.06)));
            marathontime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(42.195/parseFloat(data.distance),1.06)));
            this.setState({...this.state, laps: [],
                time: data.time,
                distance:data.distance,
                pace: data.pace,
                timeError: data.timeError,
                distanceError:data.distanceError,
                paceError: data.paceError,
                calcType: data.calcType,
                tenktime: tenktime,
                halfmarathontime: halfmarathontime,
                marathontime: marathontime});
    }

    validateDistance = function(distance: string): boolean {
        return timeUtils.validateDistance(distance);
    }

     validatePace = function(pace: string): boolean {
        return timeUtils.validatePace(pace);
    }

     validateTime = function(time: string): boolean {
        return timeUtils.validateTime(time);
    }

}

export default withStyles(styles, {withTheme: true})(Main);
