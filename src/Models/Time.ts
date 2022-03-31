class Time {
  public constructor(
    public sec: number,
    public min: number,
    public hou: number
  ) {}

  timeString(): string {
    return this.createTimeString();
  }

  createTimeString(): string {
    var sec = Time.pad(this.sec.toFixed(2), "00");
    var hours = Time.pad(this.hou.toString(10), "0");
    var min = Time.pad(this.min.toString(10), "00");

    return (hours !== "" ? hours + ":" : "") + min + ":" + sec;
  }

  createPaceString(): string {
    var sec = Time.pad(this.sec.toFixed(2), "00");
    var min = Time.pad(this.min.toString(10), "00");

    return min + ":" + sec;
  }

  static getTime(seconds: number): Time {
    var sec = seconds % 60;
    var hou = Math.floor(seconds / 3600);
    var min = Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60);
    return new Time(sec, min, hou);
  }

  static getSecMinHours(timeString: string): Time {
    return new Time(
      Time.getSeconds(timeString),
      Time.getMinutes(timeString),
      Time.getHours(timeString)
    );
  }

  static getSeconds(timeString: string): number {
    if (timeString.split(":").length - 1 < 0) return 0;
    if (timeString.split(":")[timeString.split(":").length - 1] === "")
      return 0;
    let ret = Number(timeString.split(":")[timeString.split(":").length - 1]);
    ret = ret >= 0 && ret <= 60 ? ret : NaN;
    return ret;
  }

  static getMinutes(timeString: string): number {
    if (timeString.split(":").length - 2 < 0) return 0;
    if (timeString.split(":")[timeString.split(":").length - 2] === "")
      return 0;
    let ret = Number(timeString.split(":")[timeString.split(":").length - 2]);
    ret = ret >= 0 && ret <= 60 ? ret : NaN;
    return ret;
  }

  static getHours(timeString: string): number {
    if (timeString.split(":").length - 3 < 0) return 0;
    if (timeString.split(":")[timeString.split(":").length - 3] === "")
      return 0;
    let ret = Number(timeString.split(":")[timeString.split(":").length - 3]);
    ret = ret >= 0 ? ret : NaN;
    return ret;
  }

  static getTotalSeconds(timeString: string): number {
    const t = Time.getSecMinHours(timeString);
    if (isNaN(t.sec) || isNaN(t.sec) || isNaN(t.sec)) return 0;
    return t.sec + t.min * 60 + t.hou * 60 * 60;
  }

  private static pad(value: string, char: string): string {
    value = value + "";
    if (value.indexOf(".") >= 0)
      return (
        char.substring(0, char.length - value.split(".")[0].length) + value
      );
    else return char.substring(0, char.length - value.length) + value;
  }
}

export default Time;
