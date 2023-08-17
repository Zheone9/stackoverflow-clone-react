function formatDateTime(isoDateString) {
  const date = new Date(isoDateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}`;

  return formattedDate;
}
export default formatDateTime;
