// calculate the remaining days form the current date
const calculateRemainingDays = (date) => {
  // get the current and the travel dates
  const currentDate = new Date();
  const travelDate = new Date(date);
  // calculate the difference in days
  const remainingDays = Math.ceil((travelDate - currentDate) / 86400000);
  // return the remaining days
  return remainingDays;
};

// calculate the trip length
const calculateTripLength = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format. Please enter valid dates.");
    return null;
  }

  // Calculate trip length
  const tripLength = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  // Ensure minimum trip length is 1 day
  return tripLength;
};

export { calculateRemainingDays, calculateTripLength };
