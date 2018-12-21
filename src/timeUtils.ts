class Time {
    public constructor(public sec: number, public min: number, public hou: number) {

    }

}

class TimeUtils {

    getTotalSeconds(timeString: string): number {
        const t = this.getSecMinHours(timeString);
        if (isNaN(t.sec) || isNaN(t.sec) || isNaN(t.sec))
            return 0;
        return (t.sec) + (t.min * 60) + (t.hou * 60 * 60);
    }

    getSeconds(timeString: string): number {
        if (timeString.split(':').length - 1 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 1] === '') return 0;
        let ret = Number(timeString.split(':')[timeString.split(':').length - 1]);
        ret = (ret>=0 && ret <= 60)?ret:NaN;
        return ret;
    }

    getMinutes(timeString): number {
        if (timeString.split(':').length - 2 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 2] === '') return 0;
        let ret =  Number(timeString.split(':')[timeString.split(':').length - 2]);
        ret = (ret>=0 && ret <= 60)?ret:NaN;
        return ret;
    }

    getHours(timeString):number {
        if (timeString.split(':').length - 3 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 3] === '') return 0;
        let ret =  Number(timeString.split(':')[timeString.split(':').length - 3]);
        ret = (ret>=0)?ret:NaN;
        return ret;
    }

    getSecMinHours(timeString): Time {
        return new Time(
            this.getSeconds(timeString),
            this.getMinutes(timeString),
            this.getHours(timeString));
    }

    pad(value: string, char: string): string {
        value = value + '';
        if (value.indexOf('.') >= 0)
            return char.substring(0, char.length - value.split('.')[0].length) + value;
        else
            return char.substring(0, char.length - value.length) + value;
    }

    createTimeString(time: Time) {
        var sec = this.pad(time.sec.toFixed(2), '00');
        var hours = this.pad(time.hou.toString(10), '0');
        var min = this.pad(time.min.toString(10), '00');

        return hours + ':' + min + ':' + sec;
    }

    getTime(seconds: number): Time {
        var sec = (seconds % 60);
        var hou = Math.floor(seconds / 3600);
        var min = Math.floor((seconds - (Math.floor(seconds / 3600) * 3600)) / 60);
        return new Time(sec,min,hou);
    }

    createPaceString(time: Time): string {
        var sec = this.pad(time.sec.toFixed(2), '00');
        var min = this.pad(time.min.toString(10), '00');

        return min + ':' + sec;
    }

    validateDistance(distance: string): boolean {
        return !isNaN(Number(distance));
    }

    validatePace(pace: string): boolean {
        let parsed = this.getSecMinHours(pace);
        return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
    }

    validateTime(time: string): boolean {
        let parsed = this.getSecMinHours(time);
        return !isNaN(parsed.sec) && !isNaN(parsed.min) && !isNaN(parsed.hou);
    }
}

export default new TimeUtils();