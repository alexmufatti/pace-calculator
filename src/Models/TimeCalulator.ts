import timeUtils from "../timeUtils";
import Time from "./Time";

class TimeCalculator {
  distanceError: boolean = false;
  paceError: boolean = false;
  timeError: boolean = false;
  constructor(
    private calcType: string,
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
        this.pace = "";
        this.distanceError = !timeUtils.validateDistance(this.distance);
        this.timeError = !timeUtils.validateTime(this.time);
        if (this.distanceError || this.timeError) break;
        let totSec = Time.getTotalSeconds(this.time.toString());
        var pace = totSec / parseFloat(this.distance); //s/km
        pace = isNaN(pace) ? 0 : pace;
        this.pace = Time.getTime(pace).createPaceString();
        break;
      case "DISTANCE":
        console.log("calc distance...");
        this.distance = "";
        this.timeError = !timeUtils.validateTime(this.time);
        this.paceError = !timeUtils.validatePace(this.pace);
        if (this.paceError || this.timeError) break;
        var totalSec = Time.getTotalSeconds(this.time);

        var totalSecPace = Time.getTotalSeconds(this.pace);

        let distance = totalSec / totalSecPace;

        this.distance = isNaN(distance) ? "0" : distance.toFixed(3);
        break;
      case "TIME":
        console.log("calc time...");
        this.time = "0";
        this.distanceError = !timeUtils.validateDistance(this.distance);
        this.paceError = !timeUtils.validatePace(this.pace);
        if (this.paceError || this.distanceError) break;
        var totalDistance = parseFloat(this.distance); //km
        totalDistance = isNaN(totalDistance) ? 0 : totalDistance;
        var totalSecPace = Time.getTotalSeconds(this.pace);

        var time = totalDistance * totalSecPace;

        this.time = Time.getTime(time).createTimeString();
        break;
    }
  }
}

export default TimeCalculator;
