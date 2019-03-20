

    module.exports = {
         weeks:()=> {
            var d1 = new Date();
            var d2 = new Date(d1.getFullYear(),0,1);
            var firstMonthWeekDay = d2.getDay() == 0 ? 7 : d2.getDay();
            var msPerDay = 24 * 60 * 60 * 1000;
            var daysUp = (d1.getTime() - d2.getTime()) / msPerDay;
            daysUp = Math.round(daysUp) + firstMonthWeekDay;
            var weeks = Math.ceil(daysUp / 7);
            return weeks;
            }

    }