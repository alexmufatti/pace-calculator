import Time from "./Time";

class Lap {
  constructor(index: number, pace: string, totalDistance: number) {
    this.index = index;
    this.left =
      totalDistance - (this.index + 1) >= 1 ? this.index + 1 : totalDistance;
    this.time = Time.getTime(this.left * Time.getTotalSeconds(pace));

    this.totalDistance = totalDistance;
    this.key = this.label();
  }

  totalDistance: number;
  index: number;
  time: Time;
  left: number;
  key: string;

  label() {
    return "Km " + this.left;
  }
}

export default Lap;
