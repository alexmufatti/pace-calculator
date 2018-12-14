import {UPDATE, CALCULATE} from '../action-constants';
import timeUtils from '../timeUtils';

const initialState = {
    distance: "0",
    time: "0",
    pace: "0",
    calcType: "PACE"
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE:
            let data = { time: state.time,
            distance: state.distance,
            pace: state.pace,
            calcType: state.calcType};
            data[action.field] = action.value;
            switch (data.calcType) {
                case "PACE":
                    let totSec = timeUtils.getTotalSeconds(data.time.toString());
                    var pace = totSec / parseFloat(data.distance); //s/km
                    pace = isNaN(pace)?0:pace;
                    data.pace = timeUtils.createPaceString(pace);
                    break;
                case "DISTANCE":
                    var totalSec = timeUtils.getTotalSeconds(data.time);

                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    let distance = (totalSec / totalSecPace);

                    data.distance = isNaN(distance)?"0":distance.toFixed(3);
                    break;
                case "TIME":
                    var totalDistance = parseFloat(data.distance); //km
                    totalDistance = isNaN(totalDistance)?0:totalDistance;
                    var totalSecPace = timeUtils.getTotalSeconds(data.pace);

                    var time = totalDistance * totalSecPace;

                    data.time = timeUtils.createTimeString(time);
                    break;
            }
            return { ...state, time: data.time, distance:data.distance, pace: data.pace, calcType: data.calcType};
        default:
            return state;
    }
}


export default rootReducer

