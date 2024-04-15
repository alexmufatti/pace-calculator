import Lap from "../Models/Lap.ts";
import {Button, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import {useState} from "react";
import dayjs from 'dayjs';

export default function Laps(props: { onClick: () => void, showLaps: boolean, distance: string, pace: string }) {

    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs());
    const calcLaps = (distance: string, pace: string): Array<Lap> => {
        const distanceF = parseFloat(distance);
        if (isNaN(distanceF) || distanceF <= 0) return [];
        return [...Array(Math.floor(distanceF))].map((_, idx) => {
            return new Lap(idx, pace, distanceF);
        });
    };
    const laps = calcLaps(props.distance, props.pace);
    return <>
        <Typography variant={"h3"} align={"center"}>Laps</Typography>
        <Stack>
            <TimePicker ampm={false}  views={['minutes', 'seconds']} timeSteps={{minutes: 1}} value={startTime} onAccept={(newVal) => setStartTime(newVal)} onChange={(newVal) => setStartTime(newVal)} />
            <Button
                onClick={props.onClick}
                size="small"
                variant="outlined"
            >
                Calculate Laps
            </Button>
            <div hidden={!props.showLaps}>
                <ListItem>
                    <ListItemText><b>Lap</b></ListItemText>
                    <ListItemText><b>Elapsed</b></ListItemText>
                    <ListItemText><b>Time</b></ListItemText>
                </ListItem>
                    {laps.map((l)=> (<ListItem key={l.key}>
                    <ListItemText
                    >{l.key}</ListItemText>
                    <ListItemText >{l.time.timeString()}</ListItemText>
                    <ListItemText >{startTime?.add(l.time.hou, "hours")
                        .add(l.time.min, "minutes")
                        .add(l.time.sec, "seconds").format("HH:mm:ss")}</ListItemText>
                </ListItem>))}
            </div>
        </Stack>
    </>;
}
