module.exports = (integer) =>
  integer ? integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
