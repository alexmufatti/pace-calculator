import {useState} from "react";
import PredictedTimes from "../Models/PredictedTimes";
import TimeCalculator from "../Models/TimeCalulator";
import Lap from "../Models/Lap";
import {
    Box,
    Button,
    Container, FormControl,
    FormControlLabel, FormLabel,
    ListItem, ListItemText,
    Radio,
    RadioGroup, Stack,
    TextField, Typography
} from "@mui/material";


const Main = () => {

    const [calcType, setCalcType] = useState<string>("PACE")
    const [time, setTime] = useState<string>("50:00")
    const [distance, setDistance] = useState<string>("10")
    const [pace, setPace] = useState<string>("")
    const [showLaps, setShowLaps] = useState<boolean>(false);

    const click10 = () => {
        setDistance("10")
    };

    const clickHM = () => {
        setDistance("21.0975");
    };

    const clickM = () => {
        setDistance("42.195");
    };

    const clickShowLaps = () => {
        setShowLaps(!showLaps);
    };

    const calcLaps = (distance: string, pace: string): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF);
        });
    };

    let calculator = new TimeCalculator(
        calcType,
        time,
        distance,
        pace
    );

    let predictedTimes = new PredictedTimes(
        calculator.time,
        calculator.distance
    );

    const laps = calcLaps(calculator.distance, calculator.pace);

    console.log(calculator)
    return (
        <Container maxWidth={'md'}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2}}>
                <Typography variant={"h3"} align={'center'} gutterBottom={true}>Calculator</Typography>
                <Stack alignItems={'center'}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Select which field you want to calculate</FormLabel>
                        <RadioGroup
                            row
                            aria-label="Type"
                            name="calcType"
                            value={calculator.calcType}
                            onChange={(e) => {
                                setCalcType(e.target.value)
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
                    </FormControl>
                    <TextField
                        variant="outlined"
                        error={calculator.timeError}
                        disabled={calculator.calcType === "TIME"}
                        name="time"
                        label="Time (HH:MM:SS)"
                        value={calculator.time}
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        error={calculator.distanceError}
                        disabled={calculator.calcType === "DISTANCE"}
                        name="distance"
                        label="Distance (Km)"
                        value={calculator.distance}
                        onChange={(e) => {
                            setCalcType(e.target.value)
                        }}
                        margin="normal"
                    />
                    <Stack direction={'row'}>
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
                    </Stack>
                    <TextField
                        variant="outlined"
                        error={calculator.paceError}
                        disabled={calculator.calcType === "PACE"}
                        name="pace"
                        label="Pace (MM:SS.mm)"
                        value={calculator.pace}
                        onChange={(e) => {
                            setPace(e.target.value)
                        }}
                        margin="normal"
                    />
                </Stack>
            </Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2}}>
                <Typography variant={'h3'} align={'center'}>Pace Prediction</Typography>
                <Stack direction={'row'} justifyContent={'center'} gap={5}>
                    <Stack alignItems={'center'}>
                        <Typography variant={'h6'}>10 Km</Typography>

                        <div>{predictedTimes.tenTime.timeString()}</div>
                    </Stack>
                    <Stack alignItems={'center'}>
                        <Typography variant={'h6'}>Half marathon</Typography>
                        <div>{predictedTimes.halfMarathonTime.timeString()}
                        </div>
                    </Stack>
                    <Stack alignItems={'center'}>
                        <Typography variant={'h6'}>Marathon</Typography>
                        <div>{predictedTimes.marathonTime.timeString()}
                        </div>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2}}>
                <Typography variant={'h3'} align={'center'}>Laps</Typography>
                <Stack>
                    <Button
                        onClick={clickShowLaps}
                        size="small"
                        variant="outlined"
                    >
                        Calculate Laps
                    </Button>
                    <div hidden={!showLaps}>
                        {laps.map(l => {
                            return (
                                <ListItem key={l.key}>
                                    <ListItemText
                                        primary={l.time.timeString()}
                                        secondary={l.key}
                                    />
                                </ListItem>
                            );
                        })}
                    </div>
                </Stack>
            </Box>
        </Container>
    );
}

export default Main;
