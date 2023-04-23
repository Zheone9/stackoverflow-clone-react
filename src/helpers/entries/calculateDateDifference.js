import moment from "moment";

const calculateDifference = (date) => {
  const now = moment();
  const startDate = moment(date);
  const years = now.diff(startDate, "years");
  const months = now.diff(startDate, "months");
  const days = now.diff(startDate, "days");
  const hours = now.diff(startDate, "hours");
  const minutes = now.diff(startDate, "minutes");
  const seconds = now.diff(startDate, "seconds");

  if (seconds < 60) {
    return `Asked ${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `Asked ${minutes} minutes ago`;
  } else if (hours < 24) {
    return `Asked ${hours} hours ago`;
  } else if (days < 30) {
    return `Asked ${days} days${hours > 0 ? `, ${hours} hours` : ""} ago`;
  } else if (months < 12) {
    return `Asked ${months} months${days > 0 ? `, ${days} days` : ""}${
      hours > 0 ? `, ${hours} hours` : ""
    } ago`;
  } else {
    return `Asked ${years} years${months > 0 ? `, ${months} months` : ""}${
      days > 0 ? `, ${days} days` : ""
    } ago`;
  }
};

export default calculateDifference;
