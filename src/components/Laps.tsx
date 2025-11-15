import Lap from "../Models/Lap.ts";
import {useRef, useState} from "react";
import {ActionIcon, Button, Flex, rem, Stack, Table, Title, Box} from "@mantine/core";
import {TimeInput} from "@mantine/dates";
import {IconClock} from "@tabler/icons-react";
import Time from "../Models/Time.ts";
import "../App.css";

export const MileToMk = 1.60934;

export default function Laps(props: { distance: string, pace: string }) {
    const ref = useRef<HTMLInputElement>(null);
    const now = new Date();
    const [startTime, setStartTime] = useState<string>(`${now.getHours()}:${now.getMinutes()}`);
    const [showLaps, setShowLaps] = useState<boolean>(false);

    const calcLaps = (distance: string, pace: number): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF, startTime);
        });
    };
    const calcLapsMiles = (distance: string, pace: number): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF, startTime);
        });
    };
    const laps = calcLaps(props.distance, Time.getTotalSeconds(props.pace));
    const lapsMile = calcLapsMiles((parseFloat(props.distance) / MileToMk).toString(), Time.getTotalSeconds(props.pace) * MileToMk);
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
        </ActionIcon>
    );
    const clickShowLaps = () => {
        setShowLaps(!showLaps);
    };
    return (
        <Stack align={'center'}  py={'md'}>
            <Title className="section-title" order={2}>Laps</Title>
            <Stack align={'center'}>
                <TimeInput ref={ref} rightSection={pickerControl}
                           onClick={() => ref.current?.showPicker()} value={startTime}
                           onChange={(newVal) => setStartTime(newVal.target.value)}/>

                <Button
                    onClick={clickShowLaps}
                    size="md"
                    variant="light"
                    radius="md"
                    className="laps-toggle-button"
                >
                    {showLaps ? 'Hide Laps' : 'Show Laps'}
                </Button>
                <Flex direction={'row'} gap={20} wrap="wrap" justify="center">
                <Box className="table-container" hidden={!showLaps}>
                <Table horizontalSpacing="md" verticalSpacing="sm" striped withTableBorder
                       withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Lap</Table.Th>
                            <Table.Th>Elapsed Time</Table.Th>
                            <Table.Th>Time</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {laps.map((l) => {
                            return (<Table.Tr key={l.key}>
                                <Table.Td>Km {l.key}</Table.Td>
                                <Table.Td>{l.time.timeString()}</Table.Td>
                                <Table.Td>{l.passTime}</Table.Td>
                            </Table.Tr>)
                        })}
                    </Table.Tbody>
                </Table>
                </Box>
                <Box className="table-container" hidden={!showLaps}>
                <Table horizontalSpacing="md" verticalSpacing="sm" striped withTableBorder
                       withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Lap</Table.Th>
                            <Table.Th>Elapsed Time</Table.Th>
                            <Table.Th>Time</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {lapsMile.map((l) => {
                            return (<Table.Tr key={l.key}>
                                <Table.Td>Mile {l.key}</Table.Td>
                                <Table.Td>{l.time.timeString()}</Table.Td>
                                <Table.Td>{l.passTime}</Table.Td>
                            </Table.Tr>)
                        })}
                    </Table.Tbody>
                </Table>
                </Box>
                </Flex>
            </Stack>
        </Stack>);
}
