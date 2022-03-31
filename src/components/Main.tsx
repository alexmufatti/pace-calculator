import React, {useState} from "react";

import {
    Button,
    FormControlLabel,
    Grid,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import PredictedTimes from "../Models/PredictedTimes";
import TimeCalculator from "../Models/TimeCalulator";
import Lap from "../Models/Lap";
import timeUtils from "../timeUtils";
import styled from "@emotion/styled";

type State = {
    laps: Array<Lap>;
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

const Item = styled(Card)(({ theme }) => ({
    width: '100%',
}));

const ItemContent = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
}));

const ItemHeader = styled(CardHeader)(({ theme }) => ({
    textAlign: 'center',
}));

const Main = () => {

    const [state, setState] = useState<State>({
        laps: new Array<Lap>(),
        calcType: "PACE",
        time: "50:00",
        distance: "10",
        distanceError: false,
        predictedTimes: new PredictedTimes("0", "0"),
        pace: "",
        paceError: false,
        timeError: false,
        showLaps: false
    })

    const click10 = () => {
        setState({
            ...state,
            distance: "10"
        });
    };

    const clickHM = () => {
        setState({
            ...state,
            distance: "21.0975"
        });
    };

    const clickM = () => {
        setState({
            ...state,
            distance: "42.195"
        });
    };

    const showLaps = () => {
        const laps = !state.showLaps;
        setState({
            ...state,
            showLaps: laps
        });
    };

    const calcLaps = (distance: string, pace: string): Array<Lap> => {
        const distanceF = parseFloat(state.distance);
        return [...Array(Math.floor(distanceF))].map((v, idx) => {
            return new Lap(idx, pace, distanceF);
        });
    };

    const calc = (): {
        calculator: TimeCalculator, laps: Lap[], predictedTimes: PredictedTimes
    } => {
        let calculator = new TimeCalculator(
            state.calcType,
            state.time,
            state.distance,
            state.pace
        );

        let predictedTimes = new PredictedTimes(
            calculator.time,
            calculator.distance
        );

        return {
            calculator,
            laps : state.showLaps?  calcLaps(calculator.distance, calculator.pace) : [],
            predictedTimes
        };
    }

    const validateDistance = function (distance: string): boolean {
        return timeUtils.validateDistance(distance);
    };

    const validatePace = function (pace: string): boolean {
        return timeUtils.validatePace(pace);
    };

    const validateTime = function (time: string): boolean {
        return timeUtils.validateTime(time);
    };

    console.log("render...");
    const data = calc();
    console.log(data)
    return (
        <Stack spacing={2} margin={2}>
                    <h1 style={{textAlign: 'center'}} >Pace calculator</h1>
                    <Item >
                        <ItemHeader title={'Calculator'} />
                        <ItemContent>
                            <Grid container direction="column" justifyContent="center" alignItems={'center'}>
                                <Grid item>
                                    <RadioGroup
                                        row
                                        aria-label="Type"
                                        name="calcType"
                                        value={data.calculator.calcType}
                                        onChange={(e) => {
                                            setState({
                                                ...state,
                                                calcType: e.target.value
                                            });
                                        }}
                                    >
                                        <FormControlLabel
                                            value="PACE"
                                            control={<Radio/>}
                                            label="Pace"
                                        />
                                        <FormControlLabel
                                            value="TIME"
                                            control={<Radio/>}
                                            label="Time"
                                        />
                                        <FormControlLabel
                                            value="DISTANCE"
                                            control={<Radio/>}
                                            label="Distance"
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        error={data.calculator.timeError}
                                        disabled={data.calculator.calcType === "TIME"}
                                        name="time"
                                        label="Time (HH:MM:SS)"
                                        value={data.calculator.time}
                                        onChange={(e) => {
                                            setState({
                                                ...state,
                                                time: e.target.value
                                            });
                                        }}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column">
                                        <TextField
                                            variant="outlined"
                                            error={data.calculator.distanceError}
                                            disabled={data.calculator.calcType === "DISTANCE"}
                                            name="distance"
                                            label="Distance (Km)"
                                            value={data.calculator.distance}
                                            onChange={(e) => {
                                                setState({
                                                    ...state,
                                                    distance: e.target.value
                                                });
                                            }}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        error={data.calculator.paceError}
                                        disabled={data.calculator.calcType === "PACE"}
                                        name="pace"
                                        label="Pace (MM:SS)"
                                        value={data.calculator.pace}
                                        onChange={(e) => {
                                            setState({
                                                ...state,
                                                pace: e.target.value
                                            });
                                        }}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={click10}
                                        size="small"
                                        variant="outlined"
                                    >
                                        10k
                                    </Button>
                                    <Button
                                        onClick={clickHM}
                                        size="small"
                                        variant="outlined"
                                    >
                                        Half Marathon
                                    </Button>
                                    <Button
                                        onClick={clickM}
                                        size="small"
                                        variant="outlined"
                                    >
                                        Marathon
                                    </Button>
                                </Grid>
                            </Grid>
                        </ItemContent>
                    </Item>

                    <Item >
                        <ItemHeader title={"Pace Prediction"} />
                        <ItemContent>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >

                                <Grid item xs={6}>
                                    10 Km
                                </Grid>
                                <Grid item xs={6}>
                                    {data.predictedTimes.tenTime.timeString()}

                                </Grid>
                                <Grid item xs={6}>Half marathon</Grid>
                                <Grid item xs={6}>{data.predictedTimes.halfMarathonTime.timeString()}
                                </Grid>
                                <Grid item xs={6}>Marathon</Grid>
                                <Grid item xs={6}>{data.predictedTimes.marathonTime.timeString()}
                                </Grid>
                            </Grid>
                        </ItemContent>
                    </Item>

                    <Item >
                        <ItemHeader title={"Laps"} />
                        <ItemContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                <Grid item>
                                <Button
                                    onClick={showLaps}
                                    size="small"
                                    variant="outlined"
                                >
                                    Calculate Laps
                                </Button>
                            </Grid>
                            <Grid item>
                                {data.laps.map(l => {
                                    console.log("map")
                                    return (
                                        <ListItem key={l.key}>
                                            <ListItemText
                                                primary={l.time.timeString()}
                                                secondary={l.key}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Grid>
                            </Grid>
                        </ItemContent>
                    </Item>

        </Stack>
    );
}

export default Main;
