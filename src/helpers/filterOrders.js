const filterOrders = (orders) => (orders ? {
  all: orders,
  inProgress: orders?.filter((item) => item.status.value === 1),
  ready: orders?.filter((item) => item.status.value === 2),
  received: orders?.filter((item) => item.status.value === 3),
  canceled: orders?.filter((item) => item.status.value === 4),
} : null);

export default filterOrders;
