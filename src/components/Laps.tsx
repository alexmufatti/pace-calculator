import Lap from "../Models/Lap.ts";
import {useRef, useState} from "react";
import {ActionIcon, Button, rem, Stack, Table, Title} from "@mantine/core";
import {TimeInput} from "@mantine/dates";
import {IconClock} from "@tabler/icons-react";
import Time from "../Models/Time.ts";

export default function Laps(props: { onClick: () => void, showLaps: boolean, distance: string, pace: string }) {
    const ref = useRef<HTMLInputElement>(null);
    const now = new Date();
    const [startTime, setStartTime] = useState<string>(`${now.getHours()}:${now.getMinutes()}`);
    const calcLaps = (distance: string, pace: string): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF);
        });
    };
    const laps = calcLaps(props.distance, props.pace);
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
        </ActionIcon>
    );
    return (
        <Stack align={'center'}>
            <Title>Laps</Title>
            <Stack align={'center'}>
                <TimeInput ref={ref} rightSection={pickerControl}
                           onClick={() => ref.current?.showPicker()} value={startTime}
                           onChange={(newVal) => setStartTime(newVal.target.value)}/>

                <Button
                    onClick={props.onClick}
                    size="small"
                    variant="outlined"
                >
                    Calculate Laps
                </Button>
                <Table hidden={!props.showLaps} horizontalSpacing="md" verticalSpacing="sm" striped withTableBorder
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
                            const time = new Date().setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
                            const lapTime = new Date(time + l.time.hou * 60 * 60 * 1000
                                + l.time.min * 60 * 1000
                                + l.time.sec * 1000)

                            return (<Table.Tr>
                                <Table.Td>{l.key}</Table.Td>
                                <Table.Td>{l.time.timeString()}</Table.Td>
                                <Table.Td>{`${ Time.pad(lapTime.getHours().toString(),'0')}:${ Time.pad(lapTime.getMinutes().toString(),'0')}`}</Table.Td>
                            </Table.Tr>)
                        })}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Stack>);
}
