import {useState} from "react";
import PredictedTimes from "../Models/PredictedTimes";
import Laps from "./Laps.tsx";
import {Container, TextInput, Title, Radio, Stack, Group, Button, Divider} from "@mantine/core";
import {calculateValues} from "../Models/TimeCalulator.ts";


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
        <Container>
            <Stack align={'center'} py={'md'}>
                <Title>Calculator</Title>
                <Stack>
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
                    <TextInput
                        error={calculatedTimeError}
                        disabled={calculatedCalcType === "TIME"}
                        name="time"
                        label="Time (HH:MM:SS)"
                        value={calculatedTime}
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                    />
                    <TextInput
                        error={calculatedDistanceError}
                        disabled={calculatedCalcType === "DISTANCE"}
                        name="distance"
                        label="Distance (Km)"
                        value={calculatedDistance}
                        onChange={(e) => {
                            setDistance(e.target.value)
                        }}
                    />
                    <Group>
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
                    </Group>
                    <TextInput
                        error={calculatedPaceError}
                        disabled={calculatedCalcType === "PACE"}
                        name="pace"
                        label="Pace (MM:SS.mm)"
                        value={calculatedPace}
                        onChange={(e) => {
                            setPace(e.target.value)
                        }}
                    />
                </Stack>
            </Stack>
            <Divider/>
            <Stack align={'center'} py={'md'}>
                <Title variant={'h3'}>Race Prediction</Title>
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
        </Container>
    );
}

export default Main;
