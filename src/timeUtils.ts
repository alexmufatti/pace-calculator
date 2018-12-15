class TimeUtils {


    getTotalSeconds(timeString: string) {
        const t = this.getSecMinHours(timeString);
        if (isNaN(t.sec) || isNaN(t.sec) || isNaN(t.sec))
            return 0;
        return (t.sec) + (t.min * 60) + (t.hou * 60 * 60);
    }

    getSeconds(timeString: string) {
        if (timeString.split(':').length - 1 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 1] === '') return 0;
        let ret = Number(timeString.split(':')[timeString.split(':').length - 1]);
        ret = (ret>=0 && ret <= 60)?ret:NaN;
        return ret;
    }

    getMinutes(timeString) {
        if (timeString.split(':').length - 2 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 2] === '') return 0;
        let ret =  Number(timeString.split(':')[timeString.split(':').length - 2]);
        ret = (ret>=0 && ret <= 60)?ret:NaN;
        return ret;
    }

    getHours(timeString) {
        if (timeString.split(':').length - 3 < 0) return 0;
        if (timeString.split(':')[timeString.split(':').length - 3] === '') return 0;
        let ret =  Number(timeString.split(':')[timeString.split(':').length - 3]);
        ret = (ret>=0)?ret:NaN;
        return ret;
    }

    getSecMinHours(timeString) {
        return {
            sec: this.getSeconds(timeString),
            min: this.getMinutes(timeString),
            hou: this.getHours(timeString)
        };
    }

    pad(value, char) {
        value = value + '';
        return char.substring(0, char.length - value.length) + value;
    }

    createTimeString(seconds) {
        var sec = this.pad(Math.round(seconds % 60), '00');
        var hours = this.pad(Math.floor(seconds / 3600), '0');
        var min = this.pad(Math.floor((seconds - (hours * 3600)) / 60), '00');

        return hours + ':' + min + ':' + sec;
    }

    createPaceString(seconds) {
        var sec = this.pad(Math.round(seconds % 60), '00');
        var min = this.pad(Math.floor(seconds / 60), '00');

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