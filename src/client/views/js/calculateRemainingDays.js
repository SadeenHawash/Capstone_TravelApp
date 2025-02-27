// calculate the remaining days form the current date
const calculateRemainingDays = (date) => {
  // get the current and the travel dates
  const currentDate = new Date();
  const travelDate = new Date(date);
  // calculate the difference in days
  const timeDifference = travelDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  // return the remaining days
  return remainingDays;
};

export { calculateRemainingDays };
