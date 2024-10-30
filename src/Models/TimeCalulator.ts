import timeUtils from "../timeUtils";
import Time from "./Time";

class TimeCalculator {
  public distanceError: boolean = false;
  public paceError: boolean = false;
  public timeError: boolean = false;

  constructor(
    public calcType: string,
    public time: string,
    public distance: string,
    public pace: string
  ) {
    this.calc();
  }

  private calc() {
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
          console.log("error", this.paceError, this.distanceError);
          this.time = "0";
          break;
        }
        console.log("distance: ", this.distance, "pace: ", this.pace)
        this.time = TimeCalculator.calcTime(this.distance, this.pace);
        break;
    }
  }
  private static calcDistance(pace: string, time: string): string {
    const totalSec = Time.getTotalSeconds(time);

    const totalSecPace = Time.getTotalSeconds(pace);

    let distance = totalSec / totalSecPace;

    return isNaN(distance) ? "0" : distance.toFixed(3);
  }
  private static calcPace(distance: string, time: string): string {
    let totSec = Time.getTotalSeconds(time);
    let pace = totSec / parseFloat(distance); //s/km
    pace = isNaN(pace) ? 0 : pace;
    return Time.getTime(pace).createPaceString();
  }

  private static calcTime(distance: string, pace: string): string {
    let totalDistance = parseFloat(distance); //km
    totalDistance = isNaN(totalDistance) ? 0 : totalDistance;
    let totalSecPace = Time.getTotalSeconds(pace);

    let time = totalDistance * totalSecPace;

    return Time.getTime(time).createTimeString();
  }
}

export default TimeCalculator;
