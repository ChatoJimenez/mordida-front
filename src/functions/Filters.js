import moment from "moment";

const filterByToday = (order) => {
  return (
    moment(order.timestamp).format("DD/MM/YYYY") ===
    moment().format("DD/MM/YYYY")
  );
};

const filterByMonth = (order) => {
  return moment(order.timestamp).month() === moment().month();
};

export { filterByToday, filterByMonth };
