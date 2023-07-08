export const datepickerSetoption = {
    // the locale of formatting and parsing function
    formatLocale: {
        // MMMM
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        // MMM
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        // dddd
        weekdays: ['일', '월', '화', '수', '목', '금', '토'],
        // ddd
        weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
        // dd
        weekdaysMin: ['일', '월', '화', '수', '목', '금', '토'],
        // first day of week
        firstDayOfWeek: 0,
        // first week contains January 1st.
        firstWeekContainsDate: 1,
    },
    // the calendar header, default formatLocale.weekdaysMin
    // days: [],
    // the calendar months, default formatLocale.monthsShort
    // months: [],
    yearFormat: 'YYYY년',
    monthFormat: 'MMM',
    // the calendar title of month before year
    monthBeforeYear: false,
}