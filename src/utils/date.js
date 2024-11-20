const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const arDays = ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'];
const arMonths = ['يناير', 'فبراير', 'مارس', 'ابريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'اكتوبر', 'نونبر', 'دجنبر'];

export const getDate = {
    getCurrentDate(lang) {
        const currentDate = new Date();
        const day = currentDate.getDay();
        const month = currentDate.getMonth();

        if (lang == "ar") return `${arDays[day]} ${currentDate.getDate()}, ${arMonths[month]}`
        return `${days[day]} ${currentDate.getDate()}, ${months[month]}`
    },

    getSunriseSunset(dt) {
        const date = new Date(dt * 1000);
        const hour = date.getHours().toString().padStart(2, 0);
        const minutes = date.getMinutes().toString().padStart(2, 0)

        return `${hour}:${minutes}`
    }
}