
class DateService {

    static formatDateToMDYT(date) {
        return new Date(date).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        })
    }
}

export default DateService;