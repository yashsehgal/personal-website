export function getAllDates() {
  let dates = [];
  for (let elem = 1; elem <= 31; elem++) {
    dates.push(elem);
  }
  return dates;
}

export function getAllMonths() {
  let months: {
    full: string;
    short: string;
  }[] = [
    { full: 'January', short: 'Jan' },
    { full: 'February', short: 'Feb' },
    { full: 'March', short: 'Mar' },
    { full: 'April', short: 'Apr' },
    { full: 'May', short: 'May' },
    { full: 'June', short: 'Jun' },
    { full: 'July', short: 'Jul' },
    { full: 'August', short: 'Aug' },
    { full: 'September', short: 'Sept' },
    { full: 'October', short: 'Oct' },
    { full: 'November', short: 'Nov' },
    { full: 'December', short: 'Dec' },
  ];
  return months;
}

export function getPreviousYears(amount: number) {
  let years = [];
  for (let elem = 0; elem <= amount; elem++) {
    years.push(2023 - elem);
  }
  return years;
}
