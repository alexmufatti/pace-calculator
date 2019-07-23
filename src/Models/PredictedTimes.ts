import Time from "./Time";
import timeUtils from "../timeUtils";

class PredictedTimes {
  constructor(time: string, distance: string) {
    this.tenTime = Time.getTime(
      Time.getTotalSeconds(time) * Math.pow(10 / parseFloat(distance), 1.06)
    );
    this.halfMarathonTime = Time.getTime(
      Time.getTotalSeconds(time) *
        Math.pow(21.0975 / parseFloat(distance), 1.06)
    );
    this.marathonTime = Time.getTime(
      Time.getTotalSeconds(time) * Math.pow(42.195 / parseFloat(distance), 1.06)
    );
  }

  halfMarathonTime: Time;
  marathonTime: Time;
  tenTime: Time;
}

export default PredictedTimes;
