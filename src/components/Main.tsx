import {withStyles, createStyles, WithStyles} from '@material-ui/core/styles';
import * as React from "react";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const styles = theme => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        textAlign: 'center',
    },
    field: {
        margin: theme.spacing.unit * 3
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
    distance: string,
    pace: string,
    onChange: (event) => void
}


class Main extends React.Component<Props, {}> {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.content}>
                    <h1>Pace calculator</h1>
                        <Grid container spacing={24} justify="center" >
                            <Grid item xs={12} className={classes.paper}>
                                <FormLabel >Type</FormLabel>
                                <RadioGroup
                                    aria-label="Type"
                                    name="calcType"
                                    className={classes.group}
                                    value={this.props.calcType}
                                    onChange={this.props.onChange}
                                >
                                    <FormControlLabel value="PACE" control={<Radio />} label="Pace" />
                                    <FormControlLabel value="TIME" control={<Radio />} label="Time" />
                                    <FormControlLabel value="DISTANCE" control={<Radio />} label="Distance" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} className={classes.paper}>
                                <TextField disabled={this.props.calcType == 'TIME'} name="time" label="Time" className={classes.field} value={this.props.time} onChange={this.props.onChange} margin="normal"/>
                                <TextField disabled={this.props.calcType == 'DISTANCE'} name="distance" label="Distance"  className={classes.field} value={this.props.distance} onChange={this.props.onChange} margin="normal" />
                                <TextField disabled={this.props.calcType == 'PACE'} name="pace" label="Pace"  className={classes.field} value={this.props.pace} onChange={this.props.onChange} margin="normal" />
                            </Grid>
                        </Grid>
                    </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Main);
