export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
  }
  
  export default function  getDayOfWeek(day: number): string {
    switch (day) {
      case DayOfWeek.Sunday:
        return 'Sunday';
      case DayOfWeek.Monday:
        return 'Monday';
      case DayOfWeek.Tuesday:
        return 'Tuesday';
      case DayOfWeek.Wednesday:
        return 'Wednesday';
      case DayOfWeek.Thursday:
        return 'Thursday';
      case DayOfWeek.Friday:
        return 'Friday';
      case DayOfWeek.Saturday:
        return 'Saturday';
      default:
        return '';
    }
  }
  
  