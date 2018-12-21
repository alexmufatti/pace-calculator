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
});


interface Props extends WithStyles<typeof styles> {
    calcType: string,
    time: string,
    timeError: boolean,
    distance: string,
    distanceError: boolean,
    pace: string,
    paceError: boolean,
    tenktime: string,
    halfmarathontime: string,
    marathontime: string,
    onChange: (event) => void
}

interface State {
    laps: Array<any>
}

class Main extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.click10 = this.click10.bind(this);
        this.clickHM = this.clickHM.bind(this);
        this.clickM = this.clickM.bind(this);
        this.onChange = this.onChange.bind(this);
        this.calcLaps = this.calcLaps.bind(this);
        this.state = {laps: []};
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
                            <RadioGroup aria-label="Type" name="calcType" className={classes.group} value={this.props.calcType} onChange={this.props.onChange}>
                                <FormControlLabel value="PACE" control={<Radio/>} label="Pace"/>
                                <FormControlLabel value="TIME" control={<Radio/>} label="Time"/>
                                <FormControlLabel value="DISTANCE" control={<Radio/>} label="Distance"/>
                            </RadioGroup>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid container direction="row" justify="center">
                                <Grid item>
                                    <TextField variant="outlined" error={this.props.timeError} disabled={this.props.calcType == 'TIME'} name="time" label="Time (HH:MM:SS)"
                                               className={classes.field} value={this.props.time} onChange={this.onChange} margin="normal"/>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column">
                                        <TextField variant="outlined" error={this.props.distanceError} disabled={this.props.calcType == 'DISTANCE'} name="distance"
                                                   label="Distance (Km)" className={classes.field} value={this.props.distance} onChange={this.onChange} margin="normal"/>

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
                                    <TextField variant="outlined" error={this.props.paceError} disabled={this.props.calcType == 'PACE'} name="pace" label="Pace (MM:SS)"
                                               className={classes.field} value={this.props.pace} onChange={this.onChange} margin="normal"/>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Grid item container direction="column" justify="center" alignItems="center">
                                <FormLabel>Pace Prediction</FormLabel>
                                <ListItem >
                                    <ListItemText primary={this.props.tenktime} secondary="10 Km"/>
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.props.halfmarathontime} secondary="Half marathon"/>
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.props.marathontime} secondary="Marathon"/>
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

    onChange(event) {
        this.setState((state) => {
            return {...state, laps: []}
        });
        this.props.onChange(event);
    }

    click10() {
        this.onChange({target: {name: "distance", value: "10"}});
    }

    clickHM() {
        this.onChange({target: {name: "distance", value: "21.0975"}});
    }

    clickM() {
        this.onChange({target: {name: "distance", value: "42.195"}});
    }

    calcLaps() {
        const distance = parseFloat(this.props.distance);
        const laps = [...Array(Math.floor(distance)).keys()].map((v,idx)=> {
            const left = (distance - (idx+1) >= 1) ? idx+1 : distance;
            return {key: 'Km ' + left, time: timeUtils.createTimeString(timeUtils.getTime(left * timeUtils.getTotalSeconds(this.props.pace)))}})

        this.setState((state) => {
            return {...state, laps: laps}
        });
    }

}

export default withStyles(styles, {withTheme: true})(Main);
