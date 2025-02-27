// calculate the trip length
const calculateTripLength = (startDate, endDate) => {
  if (!startDate || !endDate) {
    console.error("Both start and end dates are required.");
    return null;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format. Please enter valid dates.");
    return null;
  }

  if (end < start) {
    console.warn("End date cannot be before the start date.");
    return 0;
  }

  // Calculate trip length
  const tripLength = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  // Ensure minimum trip length is 1 day
  return tripLength;
};

export { calculateTripLength };
