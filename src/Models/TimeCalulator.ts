import timeUtils from "../timeUtils";
import Time from "./Time";

type TimeCalculatorData = {

}

class TimeCalculator {
  distanceError: boolean = false;
  paceError: boolean = false;
  timeError: boolean = false;
  constructor(
    public calcType: string,
    public time: string,
    public distance: string,
    public pace: string
  ) {
    this.calc();
  }

  calc() {
    switch (this.calcType) {
      case "PACE":
        console.log("calc pace...");
        this.distanceError = !timeUtils.validateDistance(this.distance);
        this.timeError = !timeUtils.validateTime(this.time);

        if (this.distanceError || this.timeError) {
          this.pace = "";
          break;
        }
        this.pace = TimeCalculator.calcPace(this.distance, this.time);
        break;
      case "DISTANCE":
        console.log("calc distance...");
        this.timeError = !timeUtils.validateTime(this.time);
        this.paceError = !timeUtils.validatePace(this.pace);
        if (this.paceError || this.timeError) {
          this.distance = "";
          break;
        }
        this.distance = TimeCalculator.calcDistance(this.pace, this.time);

        break;
      case "TIME":
        console.log("calc time...");
        this.distanceError = !timeUtils.validateDistance(this.distance);
        this.paceError = !timeUtils.validatePace(this.pace);
        if (this.paceError || this.distanceError) {
          this.time = "0";
          break;
        }
        this.time = TimeCalculator.calcTime(this.distance, this.pace);
        break;
    }
  }
  private static calcDistance(pace: string, time: string): string {
    var totalSec = Time.getTotalSeconds(time);

    var totalSecPace = Time.getTotalSeconds(pace);

    let distance = totalSec / totalSecPace;

    return isNaN(distance) ? "0" : distance.toFixed(3);
  }
  private static calcPace(distance: string, time: string): string {
    let totSec = Time.getTotalSeconds(time);
    var pace = totSec / parseFloat(distance); //s/km
    pace = isNaN(pace) ? 0 : pace;
    return Time.getTime(pace).createPaceString();
  }

  private static calcTime(distance: string, pace: string): string {
    var totalDistance = parseFloat(distance); //km
    totalDistance = isNaN(totalDistance) ? 0 : totalDistance;
    var totalSecPace = Time.getTotalSeconds(pace);

    var time = totalDistance * totalSecPace;

    return Time.getTime(time).createTimeString();
  }
}

export default TimeCalculator;
