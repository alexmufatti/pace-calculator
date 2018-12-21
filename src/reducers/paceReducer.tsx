import {UPDATE} from '../action-constants';
import timeUtils from '../timeUtils';

const initialState = {
    distance: "0",
    distanceError: false,
    time: "0",
    timeError: false,
    pace: "0",
    paceError: false,
    calcType: "PACE",
    marathontime: '0',
    halfmarathontime: '0',
    tenktime: '0'
}

const rootReducer = (state = initialState, action) => {

    function validateDistance(distance: string): boolean {
        return timeUtils.validateDistance(distance);
    }

    function validatePace(pace: string): boolean {
        return timeUtils.validatePace(pace);
    }

    function validateTime(time: string): boolean {
        return timeUtils.validateTime(time);
    }

    switch (action.type) {
        case UPDATE:
            let data = { time: state.time,
            distance: state.distance,
            pace: state.pace,
            calcType: state.calcType,
            timeError: false,
            distanceError: false,
            paceError: false};

            data[action.field] = action.value;
            switch (data.calcType) {
                case "PACE":
                    data.pace = "";
                    data.distanceError = !validateDistance(data.distance);
                    data.timeError = !validateTime(data.time);
                    if (data.distanceError || data.timeError) break;
                    let totSec = timeUtils.getTotalSeconds(data.time.toString());
                    var pace = totSec / parseFloat(data.distance); //s/km
                    pace = isNaN(pace)?0:pace;
                    data.pace = timeUtils.createPaceString(timeUtils.getTime(pace));
                    break;
                case "DISTANCE":
                    data.distance = "";
                    data.timeError = !validateTime(data.time);
                    data.paceError = !validatePace(data.pace);
                    if (data.paceError || data.timeError) break;
                    var totalSec = timeUtils.getTotalSeconds(data.time);

                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    let distance = (totalSec / totalSecPace);

                    data.distance = isNaN(distance)?"0":distance.toFixed(3);
                    break;
                case "TIME":
                    data.time = "0";
                    data.distanceError = !validateDistance(data.distance);
                    data.paceError = !validatePace(data.pace);
                    if (data.paceError || data.distanceError) break;
                    var totalDistance = parseFloat(data.distance); //km
                    totalDistance = isNaN(totalDistance)?0:totalDistance;
                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    var time = totalDistance * totalSecPace;

                    data.time = timeUtils.createTimeString(timeUtils.getTime(time));
                    break;
            }
            let tenktime = '0';
            let halfmarathontime = '0';
            let marathontime = '0';

            tenktime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(10/parseFloat(data.distance),1.06)));
            halfmarathontime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(21.0975/parseFloat(data.distance),1.06)));
            marathontime = timeUtils.createTimeString(timeUtils.getTime(timeUtils.getTotalSeconds(data.time)* Math.pow(42.195/parseFloat(data.distance),1.06)));
            return { ...state,
                time: data.time,
                distance:data.distance,
                pace: data.pace,
                timeError: data.timeError,
                distanceError:data.distanceError,
                paceError: data.paceError,
                calcType: data.calcType,
                tenktime: tenktime,
                halfmarathontime: halfmarathontime,
                marathontime: marathontime};
        default:
            return state;
    }
}


export default rootReducer

