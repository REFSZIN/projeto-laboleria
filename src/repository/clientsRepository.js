import connection from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function postNewClient(name, phone, address) {
  return connection.query(
    `
    INSERT INTO ${COLLECTIONS.CLIENTS} 
      (name, phone, address)
    VALUES 
      ($1, $2, $3);
  `,
    [`${name}`,`${phone}`,`${address}`]
  );
}

async function HaveUserOrder(id) {
  console.log(`
  SELECT 
  ${COLLECTIONS.ORDERS}.id as orderId,
    ${COLLECTIONS.ORDERS}.quantity as quantity,
    ${COLLECTIONS.ORDERS}."createdAt" as createdAt,
    ${COLLECTIONS.ORDERS}."totalPrice" as totalPrice,
    ${COLLECTIONS.ORDERS}."isDelivered"as isDelivered,
    ${COLLECTIONS.CAKES}.name as cakename
  FROM  orders
  inner JOIN cakes ON cakes.id = orders."clientId"
  WHERE "clientId" = $1;
`)
  const list = await connection.query(`  SELECT 
  ${COLLECTIONS.ORDERS}.id as orderId,
    ${COLLECTIONS.ORDERS}.quantity as quantity,
    ${COLLECTIONS.ORDERS}."createdAt" as createdAt,
    ${COLLECTIONS.ORDERS}."totalPrice" as totalPrice,
    ${COLLECTIONS.ORDERS}."isDelivered"as isDelivered,
    ${COLLECTIONS.CAKES}.name as cakename
  FROM  orders
  inner JOIN cakes ON cakes.id = orders."clientId"
  WHERE "clientId" = $1;
`,
    [`${id}`]
  );
  return list;
}

async function getClient(id) {
  console.log("ClientQuery order")
  const client = await connection.query(`
      SELECT * FROM ${COLLECTIONS.CLIENTS} 
      WHERE id = $1`,
    [`${id}`]
  );
  if(client.rowCount === 0){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
  return client;
}

export { postNewClient,getClient,HaveUserOrder};
