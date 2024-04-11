import Time from "./Models/Time";

class TimeUtils {
  validateDistance(distance: string): boolean {
    if (!distance || distance === "") return false;
    return !isNaN(Number(distance));
  }

  validatePace(pace: string): boolean {
    if (!pace || pace === "") return false;
    let parsed = Time.getSecMinHours(pace);
    return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
  }

  validateTime(time: string): boolean {
    if (!time || time === "") return false;
    let parsed = Time.getSecMinHours(time);
    return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
  }
}

export default new TimeUtils();
