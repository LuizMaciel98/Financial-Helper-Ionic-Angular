export class DateUtils {

    public static monthDaysCount : number[] = [31,28,31,30,31,30,31,31,30,31,30,31,31];//13 MONTHS LAST ONE IS JANUARY
    public static monthDaysLeapYear : number[] = [31,29,31,30,31,30,31,31,30,31,30,31,31];//13 MONTHS LAST ONE IS JANUARY
    
    public constructor (){ }

    public static isLeapYear(date: Date) {
        return date.getFullYear() % 4 == 0;
    }

    public static getCurrentMonthTotalDays(date: Date) {
        let result: number = 0;

        let currentMonth : number = date.getMonth();

        result = this.getMothTotalDays(date, currentMonth);

        return result;
    }

    public static getNextMonthTotalDays(date: Date) {
        let result: number = 0;

        let currentMonth : number = date.getMonth() + 1;

        result = this.getMothTotalDays(date, currentMonth);

        return result;
    }

    private static getMothTotalDays(date: Date, currentMonth: number) {
        let result: number = 0;

        if (this.isLeapYear(date)) {
            result = DataUtils.monthDaysLeapYear[currentMonth];
        } else {
            result = DataUtils.monthDaysCount[currentMonth];
        }

        return result;
    }

}