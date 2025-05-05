
class DateUtils {

    static getUserFullName(user) {
        return `${user.firstName} ${user.lastName}`
    }

    static formatEnumText(text) {
        return text
            .toLowerCase()
            .replace("_", ' ')
    }
}

export default DateUtils;