// This function takes a MongoDB timestamp and returns a formatted date string
export default function formatDateFromTimestamp(timestamp) {
  const mongoDate = new Date(timestamp);
  const currentDate = new Date();

  // Check if the date is today
  if (
    mongoDate.getDate() === currentDate.getDate() &&
    mongoDate.getMonth() === currentDate.getMonth() &&
    mongoDate.getFullYear() === currentDate.getFullYear()
  ) {
    return (
      "Today " +
      mongoDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }

  // Calculate the difference in days
  const timeDifference = Math.floor(
    (currentDate - mongoDate) / (1000 * 60 * 60 * 24)
  );

  // Check if the date is yesterday
  if (timeDifference === 1) {
    return (
      "Yesterday " +
      mongoDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }

  // If it's not today or yesterday, return the actual date
  const options = { year: "numeric", month: "long", day: "numeric" };
  return mongoDate.toLocaleDateString(undefined, options);
}
