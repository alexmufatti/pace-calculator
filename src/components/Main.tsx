import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles';
import * as React from "react";
import {TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
    onChange: (event) => void
}

class Main extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
        this.click10 = this.click10.bind(this);
        this.clickHM = this.clickHM.bind(this);
        this.clickM = this.clickM.bind(this);
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.content}>
                    <h1>Pace calculator</h1>
                    <Grid container spacing={24} justify="center">
                        <Grid item xs={12} className={classes.paper}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup aria-label="Type" name="calcType" className={classes.group} value={this.props.calcType} onChange={this.props.onChange}>
                                <FormControlLabel value="PACE" control={<Radio/>} label="Pace"/>
                                <FormControlLabel value="TIME" control={<Radio/>} label="Time"/>
                                <FormControlLabel value="DISTANCE" control={<Radio/>} label="Distance"/>
                            </RadioGroup>
                        </Grid>
                        <Grid container direction="row" justify="center" xs={12} className={classes.paper}>
                            <Grid item className={classes.paper}>
                                <TextField variant="outlined" error={this.props.timeError} disabled={this.props.calcType == 'TIME'} name="time" label="Time (HH:MM:SS)"
                                           className={classes.field} value={this.props.time} onChange={this.props.onChange} margin="normal"/>
                            </Grid>
                            <Grid item className={classes.paper}>

                                <TextField variant="outlined" error={this.props.distanceError} disabled={this.props.calcType == 'DISTANCE'} name="distance" label="Distance (Km)"
                                           className={classes.field} value={this.props.distance} onChange={this.props.onChange} margin="normal"/>
                                <Grid container direction="column" >
                                    <Button onClick={this.click10} size="small" variant="outlined" className={classes.button}>
                                        10k
                                    </Button>
                                    <Button onClick={this.clickHM} size="small" variant="outlined" className={classes.button}>
                                        Half Marathon
                                    </Button>
                                    <Button onClick={this.clickM} size="small" variant="outlined" className={classes.button}>
                                        Marathon
                                    </Button>
                                </Grid></Grid>
                            <Grid item className={classes.paper}>
                                <TextField variant="outlined" error={this.props.paceError} disabled={this.props.calcType == 'PACE'} name="pace" label="Pace (MM:SS)"
                                           className={classes.field} value={this.props.pace} onChange={this.props.onChange} margin="normal"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }

    click10() {
        this.props.onChange({target: {name: "distance", value: "10"}});
    }

    clickHM() {
        this.props.onChange({target: {name: "distance", value: "21.0975"}});
    }

    clickM() {
        this.props.onChange({target: {name: "distance", value: "42.195"}});
    }
}

export default withStyles(styles, {withTheme: true})(Main);
