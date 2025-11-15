import {useState} from "react";
import PredictedTimes from "../Models/PredictedTimes";
import Laps, {MileToMk} from "./Laps.tsx";
import {Container, TextInput, Title, Radio, Stack, Group, Button, Divider, Paper, Box} from "@mantine/core";
import {calculateValues} from "../Models/TimeCalulator.ts";
import Time from "../Models/Time.ts";
import "../App.css";


const Main = () => {

    const [calcType, setCalcType] = useState<string>("PACE")
    const [time, setTime] = useState<string>("50:00")
    const [distance, setDistance] = useState<string>("10")
    const [pace, setPace] = useState<string>("")

    const click10 = () => {
        setDistance("10")
    };

    const clickHM = () => {
        setDistance("21.0975");
    };

    const clickM = () => {
        setDistance("42.195");
    };


    const {
        calculatedTime,
        calculatedDistance,
        calculatedPace,
        calculatedCalcType,
        calculatedPaceError,
        calculatedDistanceError,
        calculatedTimeError
    } = calculateValues(
        calcType,
        time,
        distance,
        pace
    );

    const predictedTimes = new PredictedTimes(
        calculatedTime,
        calculatedDistance
    );

    return (
        <Container size="lg" py="xl">
            <Paper className="calculator-card animate-in" shadow="xl">
            <Stack align={'center'} py={'md'}>
                <Title className="main-title" order={1}>Pace Calculator</Title>
                <Stack w="100%" maw={500}>
                    <Radio.Group
                        aria-label="Type"
                        name="calcType"
                        value={calculatedCalcType}
                        label={'Select which field you want to calculate'}
                        onChange={(e) => {
                            setCalcType(e)
                        }}
                    >
                        <Group grow>
                            <Radio
                                value="PACE"
                                label="Pace"
                            />
                            <Radio
                                value="TIME"
                                label="Time"
                            />
                            <Radio
                                value="DISTANCE"
                                label="Distance"
                            />
                        </Group>
                    </Radio.Group>
                    {calculatedCalcType === "TIME" ? (
                        <Box className="result-display-container">
                            <div className="input-display-label">Time (HH:MM:SS)</div>
                            <div className="input-display">{calculatedTime}</div>
                        </Box>
                    ) : (
                        <TextInput
                            error={calculatedTimeError}
                            name="time"
                            label="Time (HH:MM:SS)"
                            value={calculatedTime}
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                        />
                    )}
                    {calculatedCalcType === "DISTANCE" ? (
                        <Box className="result-display-container">
                            <div className="input-display-label">Distance (Km)</div>
                            <div className="input-display">{calculatedDistance}</div>
                        </Box>
                    ) : (
                        <TextInput
                            error={calculatedDistanceError}
                            name="distance"
                            label="Distance (Km)"
                            value={calculatedDistance}
                            onChange={(e) => {
                                setDistance(e.target.value)
                            }}
                        />
                    )}
                    <Group grow>
                        <Button
                            onClick={click10}
                            size="md"
                            variant="light"
                            radius="md"
                        >
                            10k
                        </Button>
                        <Button
                            onClick={clickHM}
                            size="md"
                            variant="light"
                            radius="md"
                        >
                            Half Marathon
                        </Button>
                        <Button
                            onClick={clickM}
                            size="md"
                            variant="light"
                            radius="md"
                        >
                            Marathon
                        </Button>
                    </Group>
                    {calculatedCalcType === "PACE" ? (
                        <Box className="result-display-container">
                            <div className="input-display-label">Pace (MM:SS.mm)</div>
                            <div className="input-display">{calculatedPace}</div>
                        </Box>
                    ) : (
                        <TextInput
                            error={calculatedPaceError}
                            name="pace"
                            label="Pace (MM:SS.mm)"
                            value={calculatedPace}
                            onChange={(e) => {
                                setPace(e.target.value)
                            }}
                        />
                    )}
                    <Box className="mile-pace-display" ta="center">
                        <strong>Mile pace:</strong> {Time.getTime(Time.getTotalSeconds(calculatedPace) * MileToMk).createPaceString()}
                    </Box>
                </Stack>
            </Stack>
            <Divider my="xl" opacity={0.3}/>
            <Stack align={'center'} py={'md'}>
                <Title className="section-title" order={2}>Race Prediction</Title>
                <Group align={'center'}>
                    <Stack align={'center'}>
                        <Title order={3}>10 Km</Title>

                        <div>{predictedTimes.tenTime.timeString()}</div>
                    </Stack>
                    <Stack align={'center'}>
                        <Title order={3}>Half marathon</Title>
                        <div>{predictedTimes.halfMarathonTime.timeString()}
                        </div>
                    </Stack>
                    <Stack align={'center'}>
                        <Title order={3}>Marathon</Title>
                        <div>{predictedTimes.marathonTime.timeString()}
                        </div>
                    </Stack>
                </Group>
            </Stack>
            <Divider/>
            <Laps distance={calculatedDistance} pace={calculatedPace}/>
            </Paper>
        </Container>
    );
}

export default Main;
