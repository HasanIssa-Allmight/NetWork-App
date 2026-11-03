const inventory = require('./src/grpc/inventoryClient');

inventory
  .getAmount(1)
  .then((res) => console.log('quantity:', res))
  .catch((err) => console.error('failed:', err));