import moment from "moment";

const calculateDifference = (date) => {
  const now = moment();
  const startDate = moment(date);
  const years = now.diff(startDate, "years");
  const months = now.diff(startDate, "months");
  const days = now.diff(startDate, "days");
  const hours = now.diff(startDate, "hours") % 24; // Calcula las horas restantes después de los días
  const minutes = now.diff(startDate, "minutes") % 60; // Calcula los minutos restantes después de las horas

  if (years > 0) {
    return `Asked ${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `Asked ${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `Asked ${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `Asked ${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `Asked ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Asked just now";
  }
};

export default calculateDifference;
