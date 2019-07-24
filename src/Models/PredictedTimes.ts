import Time from "./Time";
import timeUtils from "../timeUtils";
import { number } from "prop-types";

class PredictedTimes {
  constructor(time: string, distance: string) {
    let d = parseFloat(distance);
    if (d === 0 || d === NaN) {
      this.tenTime = this.halfMarathonTime = this.marathonTime = new Time(
        0,
        0,
        0
      );
    } else {
      this.tenTime = Time.getTime(
        Time.getTotalSeconds(time) * Math.pow(10 / d, 1.06)
      );
      this.halfMarathonTime = Time.getTime(
        Time.getTotalSeconds(time) * Math.pow(21.0975 / d, 1.06)
      );
      this.marathonTime = Time.getTime(
        Time.getTotalSeconds(time) * Math.pow(42.195 / d, 1.06)
      );
    }
  }

  halfMarathonTime: Time;
  marathonTime: Time;
  tenTime: Time;
}

export default PredictedTimes;
