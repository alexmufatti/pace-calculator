import Time from "./Time";

class Lap {
  constructor(private index: number, private pace: number, private totalDistance: number, private startTime: string ) {
    this.left =
      this.totalDistance - (this.index + 1) >= 1 ? this.index + 1 : this.totalDistance;
    this.time = Time.getTime(this.left * this.pace);

    this.key = this.label();

    const time = new Date().setHours(parseInt(this.startTime.split(':')[0]), parseInt(this.startTime.split(':')[1]));
    const lapTime = new Date(time + this.time.hou * 60 * 60 * 1000
        + this.time.min * 60 * 1000
        + this.time.sec * 1000)
    this.passTime = `${ Time.pad(lapTime.getHours().toString(),'00')}:${ Time.pad(lapTime.getMinutes().toString(),'00')}`
  }

  time: Time;
  left: number;
  key: string;
  passTime: string;

  label() {
    return (Math.round(this.left*100)/100).toString();
  }
}

export default Lap;
