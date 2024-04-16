import Time from "./Time";

class Lap {
  constructor(index: number, pace: string, totalDistance: number, startTime: string) {
    this.index = index;
    this.left =
      totalDistance - (this.index + 1) >= 1 ? this.index + 1 : totalDistance;
    this.time = Time.getTime(this.left * Time.getTotalSeconds(pace));

    this.totalDistance = totalDistance;
    this.key = this.label();

    const time = new Date().setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
    const lapTime = new Date(time + this.time.hou * 60 * 60 * 1000
        + this.time.min * 60 * 1000
        + this.time.sec * 1000)
    this.passTime = `${ Time.pad(lapTime.getHours().toString(),'00')}:${ Time.pad(lapTime.getMinutes().toString(),'00')}`
  }

  totalDistance: number;
  index: number;
  time: Time;
  left: number;
  key: string;
  passTime: string;

  label() {
    return "Km " + this.left;
  }
}

export default Lap;
