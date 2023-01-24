function getMonthName(monthNumber: number) {
  const date = new Date();

  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

export const convertDateToHumanDate = (date1: string) => {
  const date = new Date(date1).toLocaleDateString();
  const dateArray = date.split('.');
  const month = getMonthName(+dateArray[1]).slice(0, 3);

  const normalizedDate = `${month} ${dateArray[0]}th, ${dateArray[2]}`;

  return normalizedDate;
};
