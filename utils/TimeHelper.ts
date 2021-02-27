import moment from 'moment';

const FORMAT = "YYYY-MM-DD HH:mm:ss"

export default class TimeHelper {
    static ToFormattedDate(unix: number): string {
        return moment.unix(unix).format(FORMAT)
    }
}