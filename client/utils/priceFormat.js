export default (value) => {
  if (!Number(value)) return "";
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
  return `${amount}`;
};
