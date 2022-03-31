import Time from "./Models/Time";

class TimeUtils {
  validateDistance(distance: string): boolean {
    return !isNaN(Number(distance));
  }

  validatePace(pace: string): boolean {
    let parsed = Time.getSecMinHours(pace);
    return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
  }

  validateTime(time: string): boolean {
    let parsed = Time.getSecMinHours(time);
    return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
  }
}

export default new TimeUtils();
