import Lap from "../Models/Lap.ts";
import {useRef, useState} from "react";
import {ActionIcon, Button, rem, Stack, Table, Title} from "@mantine/core";
import {TimeInput} from "@mantine/dates";
import {IconClock} from "@tabler/icons-react";

export default function Laps(props: { distance: string, pace: string }) {
    const ref = useRef<HTMLInputElement>(null);
    const now = new Date();
    const [startTime, setStartTime] = useState<string>(`${now.getHours()}:${now.getMinutes()}`);
    const [showLaps, setShowLaps] = useState<boolean>(false);

    const calcLaps = (distance: string, pace: string): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF, startTime);
        });
    };
    const laps = calcLaps(props.distance, props.pace);
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
            <Title>Laps</Title>
            <Stack align={'center'}>
                <TimeInput ref={ref} rightSection={pickerControl}
                           onClick={() => ref.current?.showPicker()} value={startTime}
                           onChange={(newVal) => setStartTime(newVal.target.value)}/>

                <Button
                    onClick={clickShowLaps}
                    size="small"
                    variant="outlined"
                >
                    Calculate Laps
                </Button>
                <Table hidden={!showLaps} horizontalSpacing="md" verticalSpacing="sm" striped withTableBorder
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
                            return (<Table.Tr>
                                <Table.Td>{l.key}</Table.Td>
                                <Table.Td>{l.time.timeString()}</Table.Td>
                                <Table.Td>{l.passTime}</Table.Td>
                            </Table.Tr>)
                        })}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Stack>);
}
