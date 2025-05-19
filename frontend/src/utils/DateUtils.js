
class DateUtils {

    static formatDate(date) {
        const dateObj = new Date(date);
        const now = new Date();

        const isCurrentYear = dateObj.getFullYear() === now.getFullYear();

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            ...(isCurrentYear ? {} : { year: 'numeric' })
        });
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return `${dateFormatter.format(dateObj)}, ${timeFormatter.format(dateObj)}`;
    }

    static formatBirthdayDate(date) {
        const dateObj = new Date(date);

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear();

        return `${day}.${month}.${year}`;
    }


}

export default DateUtils;