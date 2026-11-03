const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDef = protoLoader.loadSync(
  path.join(process.cwd(), 'inventory.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true },
);

const proto = grpc.loadPackageDefinition(packageDef).inventory;

const client = new proto.InventoryService(
  process.env.INVENTORY_GRPC_URL || 'localhost:50051',
  grpc.credentials.createInsecure(),
);

const call = (method, payload) =>
  new Promise((resolve, reject) => {
    client[method](payload, (err, res) => (err ? reject(err) : resolve(res)));
  });

module.exports = {
  getAmount: (productId) => call('GetAmount', { product_id: productId }),
};