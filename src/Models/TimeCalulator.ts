import timeUtils from "../timeUtils";
import Time from "./Time";

export function calculateValues(
    calcType: string,
    time: string,
    distance: string,
    pace: string
): {
    calculatedTime: string;
    calculatedDistance: string;
    calculatedPace: string;
    calculatedTimeError: boolean;
    calculatedCalcType: string;
    calculatedPaceError: boolean;
    calculatedDistanceError: boolean;
} {

    let timeError = false;
    let distanceError = false;
    let paceError = false;
    switch (calcType) {
        case "PACE":
            console.log("calc pace...");
            distanceError = !timeUtils.validateDistance(distance);
            timeError = !timeUtils.validateTime(time);

            if (distanceError || timeError) {
                pace = "";
                break;
            }
            pace = calcPace(distance, time);
            break;
        case "DISTANCE":
            console.log("calc distance...");
            timeError = !timeUtils.validateTime(time);
            paceError = !timeUtils.validatePace(pace);
            if (paceError || timeError) {
                distance = "";
                break;
            }
            distance = calcDistance(pace, time);

            break;
        case "TIME":
            console.log("calc time...");
            distanceError = !timeUtils.validateDistance(distance);
            paceError = !timeUtils.validatePace(pace);
            if (paceError || distanceError) {
                console.log("error", paceError, distanceError);
                time = "0";
                break;
            }
            console.log("distance: ", distance, "pace: ", pace)
            time = calcTime(distance, pace);
            break;
    }

    return {
        calculatedTime: time,
        calculatedDistance: distance,
        calculatedPace: pace,
        calculatedTimeError: timeError,
        calculatedCalcType: calcType,
        calculatedPaceError: paceError,
        calculatedDistanceError: distanceError
    };
}

function calcDistance(pace: string, time: string): string {
    const totalSec = Time.getTotalSeconds(time);

    const totalSecPace = Time.getTotalSeconds(pace);

    let distance = totalSec / totalSecPace;

    return isNaN(distance) ? "0" : distance.toFixed(3);
}

function calcPace(distance: string, time: string): string {
    let totSec = Time.getTotalSeconds(time);
    let pace = totSec / parseFloat(distance); //s/km
    pace = isNaN(pace) ? 0 : pace;
    return Time.getTime(pace).createPaceString();
}

function calcTime(distance: string, pace: string): string {
    let totalDistance = parseFloat(distance); //km
    totalDistance = isNaN(totalDistance) ? 0 : totalDistance;
    let totalSecPace = Time.getTotalSeconds(pace);

    let time = totalDistance * totalSecPace;

    return Time.getTime(time).createTimeString();
}
