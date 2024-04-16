import {useState} from "react";
import PredictedTimes from "../Models/PredictedTimes";
import TimeCalculator from "../Models/TimeCalulator";
import Laps from "./Laps.tsx";
import {Container, TextInput, Title, Radio, Stack, Group, Button, Divider} from "@mantine/core";



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



    const calculator = new TimeCalculator(
        calcType,
        time,
        distance,
        pace
    );

    const predictedTimes = new PredictedTimes(
        calculator.time,
        calculator.distance
    );

    return (
        <Container >
            <Stack align={'center'} py={'md'}>
                <Title>Calculator</Title>
                <Stack>
                        <Radio.Group
                            aria-label="Type"
                            name="calcType"
                            value={calculator.calcType}
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
                        error={calculator.timeError}
                        disabled={calculator.calcType === "TIME"}
                        name="time"
                        label="Time (HH:MM:SS)"
                        value={calculator.time}
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                    />
                    <TextInput
                        error={calculator.distanceError}
                        disabled={calculator.calcType === "DISTANCE"}
                        name="distance"
                        label="Distance (Km)"
                        value={calculator.distance}
                        onChange={(e) => {
                            setCalcType(e.target.value)
                        }}
                    />
                    <Group  >
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
                        error={calculator.paceError}
                        disabled={calculator.calcType === "PACE"}
                        name="pace"
                        label="Pace (MM:SS.mm)"
                        value={calculator.pace}
                        onChange={(e) => {
                            setPace(e.target.value)
                        }}
                    />
                </Stack>
            </Stack>
            <Divider />
            <Stack  align={'center'} py={'md'}>
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
            <Divider />
            <Laps distance={calculator.distance} pace={calculator.pace} />
        </Container>
    );
}

export default Main;
